import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  function formatSpots(spots) {
    let stringReponse = '';

    if (spots === 0) {
      stringReponse += 'no spots remaining';
    }

    if (spots === 1) {
      stringReponse += '1 spot remaining';
    }
    
    if (spots > 1) {
      stringReponse += `${spots} spots remaining`;
    }

    return stringReponse;
  }
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}