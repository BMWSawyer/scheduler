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


export function getInterview(state, interview) {
  const interviewersList = state.interviewers;
  const completeInterview = {};

  if(interview !== null) {
    const interviewerId = interview.interviewer;

    completeInterview["student"] = interview.student;

    if (interviewersList[interviewerId]) {
      completeInterview["interviewer"] = {
      "id": interviewerId,
      "name": interviewersList[interviewerId].name,
      "avatar": interviewersList[interviewerId].avatar
      }
    }

    return completeInterview;
  }

  return null;
}