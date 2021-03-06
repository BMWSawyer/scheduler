import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    setHistory((prev) => {
      const newHistory = [...prev];
      
      if(replace){
        newHistory.pop()
      }
      
      return [...newHistory, newMode];
    }); 
  }

  function back() {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop()

      return newHistory;
    });
  }

  const mode = history[history.length - 1];

  return { mode, transition, back };
}