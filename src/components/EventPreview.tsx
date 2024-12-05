import type { Event } from "../services/types";
import "../styles/components/schedule.css";

interface Props {
  event: Event;
}

const EventPreview = ({ event }: Props) => {
  return (
    <li className="event-preview">
      <div className="event-preview__main">
        <img className="event-preview__image" src={`/events/${event.image}`} />
        <h4 className="event-preview__title">{event.title}</h4>
      </div>
      <div className="event-preview__tags">
        {event.tags.map((tag) => (
          <span key={tag} className="event-preview__tag regular">
            {tag}
          </span>
        ))}
        <span className="event-preview__tag location">{event.location}</span>
        {event.startTime && event.endTime ? (
          <>
            <span className="event-preview__tag time">
              {new Intl.DateTimeFormat("nl-BE", {
                timeStyle: "short",
              }).format(event.startTime)}{" "}
              -{" "}
              {new Intl.DateTimeFormat("nl-BE", {
                timeStyle: "short",
              }).format(event.endTime)}
            </span>
            {event.startTime2 && event.endTime2 && (
              <span className="event-preview__tag time">
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                }).format(event.startTime2)}{" "}
                -{" "}
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                }).format(event.endTime2)}
              </span>
            )}{" "}
          </>
        ) : (
          <span className="event-preview__tag no-bg">Heel de tijd</span>
        )}
      </div>
    </li>
  );
};

export default EventPreview;