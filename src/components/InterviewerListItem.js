import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
    "interviewers__item--selected-image": props.selected && props.avatar,
  });

  function showName(name) {
    
    if (props.selected) {
      return name;
    }

    return null;
  }
  
  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
      className={interviewerClass}
      src={props.avatar}
      alt={props.name}
      />
      {showName(props.name)}
    </li>
  );
}