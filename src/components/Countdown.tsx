import { useEffect, useState } from "react";
import "../styles/components/countdown.css";
import type { Language } from "../services/types";
import languages from "../services/languages.json";

interface CountdownProps {
  // current language of the website.
  language: Language;
}

const Countdown = ({ language }: CountdownProps) => {
  const copy = languages[language];
  //Date + time of the festival
  const startFestival = new Date("2024-12-14T17:00:00+01:00");
  //Time left until the festival, in seconds.
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((startFestival.getTime() - new Date().getTime()) / 1000)
  );

  //Days, hours, minutes and seconds left until the festival.
  const [days, setDays] = useState(Math.floor(timeLeft / (60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((timeLeft / (60 * 60)) % 24));
  const [minutes, setMinutes] = useState(Math.floor((timeLeft / 60) % 60));
  const [seconds, setSeconds] = useState(Math.floor(timeLeft % 60));

  useEffect(() => {
    //set an interval to update the time left every second
    const timerInterval = setInterval(() => {
      //calculate the new time left
      const newTime = Math.floor(
        (startFestival.getTime() - new Date().getTime()) / 1000
      );
      //only update if the time left has changed
      if (newTime !== timeLeft) {
        setTimeLeft(newTime);
        setDays(Math.floor(newTime / (60 * 60 * 24)));
        setHours(Math.floor((newTime / (60 * 60)) % 24));
        setMinutes(Math.floor((newTime / 60) % 60));
        setSeconds(Math.floor(newTime % 60));
      }
    }, 1000);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [setTimeLeft, setDays, setHours, setMinutes, setSeconds]);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimeLeft(0);
    }
  }, [timeLeft]);

  return (
    // Hide countdown when event has started
    <div className={`countdown ${timeLeft <= 0 ? "started" : ""}`}>
      {/* Don't show days if there is less than a day left. */}
      {days >= 1 && (
        <div className="countdown__time days">
          <span className="countdown__number">{days}</span>
          <span className="countdown__text">
            {/* Make sure it shows plurar on multiple and zero, and singular on one */}
            {days === 1 ? copy.date.day : copy.date.days}
          </span>
        </div>
      )}

      <div className="countdown__time hours">
        <span className="countdown__number">{hours}</span>
        <span className="countdown__text">
          {/* Make sure it shows plurar on multiple and zero, and singular on one */}

          {hours === 1 ? copy.date.hour : copy.date.hours}
        </span>
      </div>
      <div className="countdown__time minutes">
        <span className="countdown__number">{minutes}</span>
        <span className="countdown__text">
          {/* Make sure it shows plurar on multiple and zero, and singular on one */}

          {minutes === 1 ? copy.date.minute : copy.date.minutes}
        </span>
      </div>
      {/* Only show when there is less than a day left */}
      {days < 1 && (
        <div className="countdown__time seconds">
          <span className="countdown__number">{seconds}</span>
          <span className="countdown__text">
            {/* Make sure it shows plurar on multiple and zero, and singular on one */}

            {seconds === 1 ? copy.date.second : copy.date.seconds}
          </span>
        </div>
      )}
    </div>
  );
};
export default Countdown;
