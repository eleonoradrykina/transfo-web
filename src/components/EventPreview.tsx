import type { IEvent } from "../services/types";
import "../styles/components/schedule.css";

interface Props {
  event: IEvent;
  withLocation?: boolean;
  handleClick: (event: IEvent) => void;
}

const EventPreview = ({ event, withLocation, handleClick }: Props) => {
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
        {withLocation && (
          <span className="event-preview__tag location">{event.location}</span>
        )}

        {event.startTime && event.endTime ? (
          <>
            <span className="event-preview__tag time">
              {new Intl.DateTimeFormat("nl-BE", {
                timeStyle: "short",
                timeZone: "Europe/Brussels",
              }).format(event.startTime)}{" "}
              -{" "}
              {new Intl.DateTimeFormat("nl-BE", {
                timeStyle: "short",
                timeZone: "Europe/Brussels",
              }).format(event.endTime)}
            </span>
            {event.startTime2 && event.endTime2 && (
              <span className="event-preview__tag time">
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                  timeZone: "Europe/Brussels",
                }).format(event.startTime2)}{" "}
                -{" "}
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                  timeZone: "Europe/Brussels",
                }).format(event.endTime2)}
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
