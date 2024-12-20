import { useEffect, useState } from "react";
import "../styles/components/countdown.css";
import type { Language } from "../services/types";
import languages from "../services/languages.json";

interface CountdownProps {
  language: Language;
}

const Countdown = ({ language }: CountdownProps) => {
  const copy = languages[language];
  const startFestival = new Date("2024-12-14T17:00:00+01:00"); //TODO: CHANGE BACK
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((startFestival.getTime() - new Date().getTime()) / 1000)
  );
  const [days, setDays] = useState(Math.floor(timeLeft / (60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((timeLeft / (60 * 60)) % 24));
  const [minutes, setMinutes] = useState(Math.floor((timeLeft / 60) % 60));
  const [seconds, setSeconds] = useState(Math.floor(timeLeft % 60));

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newTime = Math.floor(
        (startFestival.getTime() - new Date().getTime()) / 1000
      );
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
    <div className={`countdown ${timeLeft <= 0 ? "started" : ""}`}>
      {days >= 1 && (
        <div className="countdown__time days">
          <span className="countdown__number">{days}</span>
          <span className="countdown__text">
            {days === 1 ? copy.date.day : copy.date.days}
          </span>
        </div>
      )}

      <div className="countdown__time hours">
        <span className="countdown__number">{hours}</span>
        <span className="countdown__text">
          {hours === 1 ? copy.date.hour : copy.date.hours}
        </span>
      </div>
      <div className="countdown__time minutes">
        <span className="countdown__number">{minutes}</span>
        <span className="countdown__text">
          {minutes === 1 ? copy.date.minute : copy.date.minutes}
        </span>
      </div>
      {days < 1 && (
        <div className="countdown__time seconds">
          <span className="countdown__number">{seconds}</span>
          <span className="countdown__text">
            {seconds === 1 ? copy.date.second : copy.date.seconds}
          </span>
        </div>
      )}
    </div>
  );
};
export default Countdown;
