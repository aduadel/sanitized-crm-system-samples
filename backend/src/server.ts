import { app } from "./app.js";
import { env } from "./config/env.js";
import { startSessionReminderScheduler } from "./services/session-reminder-scheduler.js";

app.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});

startSessionReminderScheduler();
