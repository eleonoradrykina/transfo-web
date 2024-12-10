import { getTime } from "../services/functions";
import type { IEvent } from "../services/types";
import "../styles/components/schedule.css";

interface Props {
  event: IEvent;
  location?: string;
  handleClick: (event: IEvent) => void;
}

const EventPreview = ({ event, handleClick, location }: Props) => {
  console.log(event.title);

  return (
    <button onClick={() => handleClick(event)} className="event-preview">
      <div className="event-preview__main">
        <img
          className="event-preview__image"
          src={`/events/${event.heroImage}`}
        />
        <h4 className="event-preview__title">{event.title}</h4>
      </div>
      <div className="event-preview__tags">
        {event.tags.map((tag) => (
          <span key={tag} className="event-preview__tag regular">
            {tag}
          </span>
        ))}
        {location && (
          <span className="event-preview__tag location">{location}</span>
        )}

        {event.startTime && event.endTime ? (
          <>
            <span className="event-preview__tag time">
              {getTime(event.startTime)} - {getTime(event.endTime)}
            </span>
            {event.startTime2 && event.endTime2 && (
              <span className="event-preview__tag time">
                {getTime(event.startTime2)} - {getTime(event.endTime2)}
              </span>
            )}{" "}
          </>
        ) : (
          <span className="event-preview__tag no-bg">Heel de avond</span>
        )}
      </div>
    </button>
  );
};

export default EventPreview;
