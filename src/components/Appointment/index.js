import React, { useEffect } from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then((res) => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then((res) => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  }

  useEffect(() => {
    if (mode === EMPTY && props.interview) {
      transition(SHOW);
    }

    if (mode === SHOW && !props.interview) {
      transition(EMPTY);
    }
  }, [mode, props.interview, transition]);


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW&& props.interview && (
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
          onSave={(student, interviewer) => save(student, interviewer)}
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
          onConfirm={() => deleteAppointment()}
        />)}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back(SHOW)}
          onSave={(student, interviewer) => save(student, interviewer)}
        />)}
        {mode === ERROR_SAVE && (
        <Error 
          message={"There was an error saving your appointment. Please try again."}
          onClose={() => back(CREATE)}
        />)}
        {mode === ERROR_DELETE && (
        <Error 
          message={"There was an error deleting your appointment. Please try again."}
          onClose={() => back(SHOW)}
        />)}
    </article>
  );
}
