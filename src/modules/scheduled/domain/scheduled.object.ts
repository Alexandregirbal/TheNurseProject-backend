export type AppointmentScheduled = {
  day: number
  schedules: { startTime: { hour: number; minute: number }; endTime: { hour: number; minute: number } }
}
