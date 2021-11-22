export function getAppointmentsForDay(state, day) {
  const appointments = state.appointments;
  const daysArray = state.days;
  const dailyAppointments = [];
  const appointmentsForDay = [];

 daysArray.forEach((dayOfWeek) => { 
    
    if (day === dayOfWeek.name) {
      dayOfWeek.appointments.map(appointment => dailyAppointments.push(appointment));
    }
    
    return dailyAppointments;
  });

  for (const appointmentId in appointments) {
    dailyAppointments.forEach((singleAppointment) => {
      if (singleAppointment === appointments[appointmentId].id) {
        appointmentsForDay.push(appointments[appointmentId]);
      }
    } 
  )};
 
  return appointmentsForDay;
}