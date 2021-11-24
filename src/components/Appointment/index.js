import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
//import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

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
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then((res) => transition(SHOW));
  }

  function deleteAppointment() {
    props.cancelInterview(props.id)
    .then((res) => transition(EMPTY));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={(student, interviewer) => {
            transition(SAVING)
            save(student, interviewer)
          }}
        />)}
      {mode === SAVING && (
        <Status
          message={"SAVING"}
        />)}
      {mode === DELETING && (
        <Status
          message={"DELETING"}
        />)}
      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you want to delete this appointment?"}
          onCancel={() => back(SHOW)}
          onConfirm={() => {
            transition(DELETING)
            deleteAppointment()
          }}
        />)}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back(SHOW)}
          onSave={(student, interviewer) => {
            transition(SAVING)
            save(student, interviewer)
          }}
        />)}
    </article>
  );
}
