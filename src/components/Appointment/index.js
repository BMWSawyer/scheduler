import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  function checkAppointment(time) {
    let stringReponse = "";

    if (time) {
      stringReponse += `Appointment at ${time}`;
    } else {
      stringReponse += "No Appointments";
    }

    return stringReponse;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
