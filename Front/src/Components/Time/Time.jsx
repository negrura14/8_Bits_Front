import React, {useEffect, useState} from "react";
import './Time.css';

function DateTimeDisplay() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000); // Actualiza cada segundo
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const formattedDateTime = currentDateTime.toLocaleString();
  
    return (
        <div className="clock-container">
            <p className="time">{formattedDateTime}</p> {/* Aplica la clase "time" */}
        </div>
    )
  }
  
  export default DateTimeDisplay;