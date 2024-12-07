import { useEffect } from "react";
import { type IEvent } from "../services/types";
import "../styles/components/schedule.css";

interface Props {
  event: IEvent;
}

const Event = ({ event }: Props) => {
  useEffect(() => {
    const test = document.getElementById(`content__${event.name}`);
    if (test) {
      test.innerHTML = event.content;
    }
  }, []);

  return (
    <div className="event">
      <div className="w-full flex flex-row">
        <a className="event__back" href={`/${event.location}`}>
          <span className="hidden md:inline">
            Terug naar <span>{event.location}</span>
          </span>
          <span className="md:hidden">←</span>
        </a>
      </div>

      <div>
        <h4 className="event__title">{event.title}</h4>
        <span>{event.name}</span>
      </div>

      <div className="flex flex-row md:flex-col gap-15 mt-15 md:mb-30">
        <img
          className="event__image"
          src={`/events/${event.heroImage}`}
          alt={event.name}
        />
        <div className="event__tags">
          {event.tags.map((tag) => (
            <span key={tag} className="event__tag regular">
              {tag}
            </span>
          ))}
          <span className="event-preview__tag location">{event.location}</span>
          {event.startTime && event.endTime ? (
            <>
              <span className="event__tag time">
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                }).format(event.startTime)}{" "}
                -{" "}
                {new Intl.DateTimeFormat("nl-BE", {
                  timeStyle: "short",
                }).format(event.endTime)}
              </span>
              {event.startTime2 && event.endTime2 && (
                <span className="event__tag time">
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
            <span className="event__tag no-bg">Heel de avond</span>
          )}
        </div>
      </div>

      <div className="event__content">
        <div id={`content__${event.name}`}></div>
      </div>
    </div>
  );
};

export default Event;
