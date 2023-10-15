
import { useState, useEffect } from 'react';

function useFormattedDate() {
  const [date, setDate] = useState(getFormattedDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getFormattedDate());
    }, 24 * 60 * 60 * 1000); // update date every 24 hours

    return () => clearInterval(intervalId);
  }, []);

  function getFormattedDate() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
    return `${dayOfWeek} ${month} ${dayOfMonth}, ${year}`;
  }

  return date;
}

export default useFormattedDate;
