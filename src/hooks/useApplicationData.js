import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function reducer(state, action) {
    const updateSpots = (id, interview) => {
      let count = 0;
      let index;
      const days = [...state.days];

      days.forEach((currentDay, dayIndex) => {
        if (currentDay.appointments.includes(id)) {
          index = dayIndex;

          currentDay.appointments.forEach((appointmentId) => {
            if (
              !state.appointments[appointmentId].interview &&
              appointmentId !== id
            ) {
              count += 1;
            }
          });
        }
      });

      if (!interview) {
        count += 1;
      }

      const day = {
        ...days[index],
        spots: count,
      };

      days.splice(index, 1, day);

      return days;
    };

    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW: {
        let interview;

        !action.interview
          ? (interview = null)
          : (interview = action.interview);
        
        const appointment = {
          ...state.appointments[action.id],
          interview: interview,
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        const days = updateSpots(action.id, action.interview);

        return {
          ...state,
          appointments,
          days,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null,
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
