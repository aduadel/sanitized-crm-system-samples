export type SampleEntityRecord = {
  id: string;
  [key: string]: unknown;
};

type SampleStore = Record<string, SampleEntityRecord[]>;

export const sampleStore: SampleStore = {
  leads: [
    {
      id: "lead-1",
      fullName: "Amy Parker",
      stage: "qualified",
      owner: "Admissions Team",
      channel: "Referral",
    },
    {
      id: "lead-2",
      fullName: "Kevin Nelson",
      stage: "new",
      owner: "Sales Desk",
      channel: "Instagram",
    },
  ],
  invoices: [
    {
      id: "inv-1001",
      subject: "April Tuition",
      client: "Smith Family",
      status: "issued",
      totalAmount: 320,
      currency: "USD",
    },
  ],
  sessions: [
    {
      id: "session-1",
      session_day: "Friday",
      session_hour: "19",
      session_minute: "30",
      status: "active",
      start_time_label: "7:30 PM",
      meeting_link: "https://example.com/room",
      meeting_room_id: "4433",
      meeting_password: "sample",
    },
  ],
  users: [
    {
      id: "trainer-1",
      display_name: "Noah Adams",
      status: "active",
      role: "trainer",
      notifications_enabled: true,
      contact_no_1: "+15550000001",
    },
  ],
  session_enrollments: [
    {
      id: "enrollment-1",
      session_id: "session-1",
      user_id: "trainer-1",
    },
  ],
};
