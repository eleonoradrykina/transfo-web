import { useState, useEffect } from "react";
import { getTime } from "../services/functions";
import type { IEvent } from "../services/types";
import "../styles/components/schedule.css";

interface Props {
  event: IEvent;
  location?: string;
  handleClick: (event: IEvent) => void;
  time: number;
  copy: any;
}

export const determineTimeTag = (event: IEvent, copy: any) => {
  const now = new Date().getTime();

  if (event.startTime && event.endTime) {
    if (now > event.endTime.getTime()) {
      return <span className="tag time over">{copy.schedule.over}</span>;
    } else if (
      now > event.startTime.getTime() &&
      now < event.endTime.getTime()
    ) {
      return (
        <span className="tag time almost">
          {copy.schedule["currently-happening"]}
        </span>
      );
    } else if (now > event.startTime.getTime() - 1000 * 60 * 30) {
      const timeLeft = Math.floor(
        (event.startTime.getTime() - now) / (1000 * 60)
      );
      return (
        <span className="tag time almost">{`${copy.schedule.in} ${timeLeft} ${timeLeft === 1 ? copy.date.minute : copy.date.minutes}`}</span>
      );
    } else {
      return (
        <span className="tag time">
          {getTime(event.startTime)} - {getTime(event.endTime)}
        </span>
      );
    }
  }
  return <span className="tag no-bg">{copy.schedule["all-night"]}</span>;
};

const EventPreview = ({ event, handleClick, location, time, copy }: Props) => {
  const [timeTag, setTimeTag] = useState(determineTimeTag(event, copy));

  useEffect(() => {
    setTimeTag(determineTimeTag(event, copy));
  }, [time]);

  return (
    <button onClick={() => handleClick(event)} className="event-preview">
      <div className="event-preview__main">
        <img
          className="event-preview__image"
          src={`/events/${event.heroImage}`}
        />
        <h4 className="event-preview__title">{event.title}</h4>
      </div>
      <div className="tags">
        {event.tags.map((tag) => (
          <span key={tag} className="tag regular">
            {tag}
          </span>
        ))}
        {location && <span className="tag location">{location}</span>}
        {timeTag}
        <span className="tag no-bg">{event.extraTime}</span>
      </div>
    </button>
  );
};

export default EventPreview;
