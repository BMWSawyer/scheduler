import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(id, interview) {
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

    if(!interview) {
      count += 1;
    }

    const day = {
      ...days[index],
      spots: count,
    };

    days.splice(index, 1, day);

    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, interview);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({
        ...prev,
        appointments,
        days
      }));
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id);

    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
