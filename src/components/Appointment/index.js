import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  
  function checkAppointment(time) {
    let stringReponse = '';

    if (time) {
      stringReponse += `Appointment at ${time}`;
    } else {
      stringReponse += 'No Appointments';
    }

    return stringReponse;
  }

  return (
    <article className="appointment">
      {checkAppointment(props.time)}
    </article>
  );
}