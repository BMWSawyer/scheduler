import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
//import Confirm from "./Confirm";
//import Status from "./Status";
//import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Status from "./Status";

export default function Appointment(props) {
  // function checkAppointment(time) {
  //   let stringReponse = "";

  //   if (time) {
  //     stringReponse += `Appointment at ${time}`;
  //   } else {
  //     stringReponse += "No Appointments";
  //   }

  //   return stringReponse;
  // }
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  //const EDIT = "EDIT";
  //const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  //const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={() => transition(SAVING)}
        />)}
      {mode === SAVING && (
        <Status
          message={"SAVING"}
        />)}

    </article>
  );
}
