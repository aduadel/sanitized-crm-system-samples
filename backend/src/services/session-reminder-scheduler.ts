import { DateTime } from "luxon";
import { sampleStore } from "../data/sample-store.js";
import { sendTemplateMessage } from "./whatsapp-template-message.js";

type SessionRecord = {
  id: string;
  session_day: string;
  session_hour: string;
  session_minute: string;
  status: string;
  start_time_label: string;
  meeting_link: string;
  meeting_room_id: string;
  meeting_password: string;
};

function dayNameToNumber(dayName: string) {
  const daysOfWeek: Record<string, number> = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return daysOfWeek[dayName];
}

function getActiveSessions() {
  return sampleStore.sessions.filter(
    (session): session is SessionRecord => session.status === "active",
  );
}

function shouldSendReminderForSession(
  session: SessionRecord,
  currentTime: DateTime,
) {
  const sessionDay = dayNameToNumber(session.session_day);
  const sessionHour = parseInt(session.session_hour, 10);
  const sessionMinute = parseInt(session.session_minute, 10);
  const attemptHour = currentTime.hour;
  const attemptMinute = currentTime.minute;
  const isSameDay = sessionDay === currentTime.weekday;

  const isDailyReminder =
    attemptHour === 10 && attemptMinute === 0 && sessionHour > attemptHour;
  const isSessionIn1Hour =
    (attemptHour === sessionHour - 1 && attemptMinute === sessionMinute) ||
    (attemptHour === sessionHour - 1 &&
      sessionMinute === 0 &&
      attemptMinute === 0);
  const isSessionIn15Minutes =
    (attemptHour === sessionHour && attemptMinute === sessionMinute - 15) ||
    (attemptHour === sessionHour - 1 &&
      sessionMinute < 15 &&
      attemptMinute === 60 - (15 - sessionMinute));

  return isSameDay && (isDailyReminder || isSessionIn1Hour || isSessionIn15Minutes);
}

async function sendSessionReminder(session: SessionRecord) {
  const enrollments = sampleStore.session_enrollments.filter(
    (item) => item.session_id === session.id,
  );

  for (const enrollment of enrollments) {
    const user = sampleStore.users.find((item) => item.id === enrollment.user_id);
    if (!user || !user.notifications_enabled) {
      continue;
    }

    for (let index = 1; index <= 4; index += 1) {
      const contact = user[`contact_no_${index}`];
      if (!contact || typeof contact !== "string") {
        continue;
      }

      await sendTemplateMessage(contact, [
        user.display_name as string,
        session.start_time_label,
        session.meeting_link,
      ]);
    }
  }
}

async function processActiveSessions(currentTime: DateTime) {
  for (const session of getActiveSessions()) {
    if (shouldSendReminderForSession(session, currentTime)) {
      await sendSessionReminder(session);
    }
  }
}

export function startSessionReminderScheduler() {
  const run = async () => {
    const now = DateTime.now().setZone("Europe/Berlin");
    await processActiveSessions(now);
  };

  void run();
  return setInterval(() => {
    void run();
  }, 60_000);
}
