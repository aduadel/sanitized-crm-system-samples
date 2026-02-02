import { DateTime } from "luxon";

/**
 * Map a weekday name to Luxon weekday number (1 = Monday, 7 = Sunday).
 */
function dayNameToNumber(dayName) {
  const daysOfWeek = {
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

/**
 * Fetch active sessions that should be monitored for reminders.
 * Replace this with your own DB query.
 */
async function getActiveSessions(db) {
  return db("sessions").select().where("status", "active");
}

/**
 * Decide whether it's time to send a reminder for a given session.
 *
 * Rules (example):
 * - Send one daily reminder at 10:00 if the session is later the same day.
 * - Send a reminder 1 hour before.
 * - Send a reminder 15 minutes before.
 */
function shouldSendReminderForSession(session, currentTime) {
  const sessionDay = dayNameToNumber(session.session_day);
  const sessionHour = parseInt(session.session_hour, 10);
  const sessionMinute = parseInt(session.session_minute, 10);

  const attemptHour = currentTime.hour;
  const attemptMinute = currentTime.minute;
  const attemptDay = currentTime.weekday;

  const isSameDay = sessionDay === attemptDay;

  const isReminderTime = attemptHour === 10 && attemptMinute === 0;
  const isSessionLaterInDay = sessionHour > attemptHour;
  const isDailyReminder = isReminderTime && isSessionLaterInDay;

  const isSessionIn1Hour =
    (attemptHour === sessionHour - 1 && attemptMinute === sessionMinute) ||
    (attemptHour === sessionHour - 1 &&
      sessionMinute === 0 &&
      attemptMinute === 60 - (60 - sessionMinute));

  const isSessionIn15Minutes =
    (attemptHour === sessionHour && attemptMinute === sessionMinute - 15) ||
    (attemptHour === sessionHour - 1 &&
      sessionMinute < 15 &&
      attemptMinute === 60 - (15 - sessionMinute));

  const shouldSend =
    (isSessionIn1Hour || isSessionIn15Minutes || isDailyReminder) && isSameDay;

  return shouldSend;
}

/**
 * Fetch user ids for a given session.
 */
async function fetchUserIdsForSession(db, session) {
  return db("session_enrollments")
    .where("session_id", session.id)
    .select("user_id");
}

/**
 * Fetch user by id.
 */
async function fetchUserById(db, userIdRow) {
  const result = await db("users").where("id", userIdRow.user_id);
  return result[0];
}

/**
 * Check if the user is active and has notifications enabled.
 */
function isActiveUserWithNotificationsEnabled(user) {
  const isActive = user.status === "active" || user.role === "trainer";
  const notificationsEnabled = user.notifications_enabled;
  return isActive && notificationsEnabled;
}

/**
 * Send a reminder notification to a user for a specific session.
 * Replace the notification call with your own implementation.
 */
async function sendReminderForUser(user, session) {
  if (!isActiveUserWithNotificationsEnabled(user)) return;

  for (let i = 1; i <= 4; i++) {
    const contact = user[`contact_no_${i}`];
    if (contact) {
      await sendReminderNotification({
        to: contact,
        name: user.display_name,
        sessionTime: session.start_time_label,
        meetingLink: session.meeting_link,
        meetingRoomId: session.meeting_room_id,
        meetingPassword: session.meeting_password,
      });
    }
  }
}

/**
 * Send reminders for all users in a given session if it qualifies.
 */
async function sendSessionReminder(db, session, currentTime) {
  const shouldSend = shouldSendReminderForSession(session, currentTime);
  if (!shouldSend) return;

  const userIds = await fetchUserIdsForSession(db, session);
  for (const userId of userIds) {
    const user = await fetchUserById(db, userId);
    await sendReminderForUser(user, session);
  }
}

/**
 * Process all active sessions and send reminders when needed.
 */
async function processActiveSessions(db, currentTime) {
  const activeSessions = await getActiveSessions(db);

  for (const session of activeSessions) {
    await sendSessionReminder(db, session, currentTime);
  }
}

const DEFAULT_TIMEZONE = "Europe/Berlin";

/**
 * Send reminders based on business timezone.
 */
async function sendRemindingMessages(db) {
  const now = DateTime.now().setZone(DEFAULT_TIMEZONE);
  await processActiveSessions(db, now);
}

/**
 * Starts the reminder scheduler.
 * Call this once when your application starts and pass your DB client.
 *
 * @param {object} db - Database client/connection instance.
 */
const startSessionReminderScheduler = (db) => {
  sendRemindingMessages(db);
  setInterval(() => sendRemindingMessages(db), 60_000); // Run every minute
};

export default startSessionReminderScheduler;
