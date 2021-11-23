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

export function getInterviewersForDay(state, day) {
  const interviewers = state.interviewers;
  const daysArray = state.days;
  const dailyInterviewers = [];
  const interviewersForDay = [];

 daysArray.forEach((dayOfWeek) => { 
    
    if (day === dayOfWeek.name) {
      dayOfWeek.interviewers.map(interviewer => dailyInterviewers.push(interviewer));
    }
    
    return dailyInterviewers;
  });

  for (const interviewerId in interviewers) {
    dailyInterviewers.forEach((singleInterviewer) => {
      if (singleInterviewer === interviewers[interviewerId].id) {
        interviewersForDay.push(interviewers[interviewerId]);
      }
    } 
  )};
 
  return interviewersForDay;
}