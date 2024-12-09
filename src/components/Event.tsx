import { useEffect } from "react";
import { type IEvent } from "../services/types";
import "../styles/components/schedule.css";
import { getTime } from "../services/functions";

interface Props {
  event: IEvent;
  handleBack: (location: string) => void;
  location: string;
}

const Event = ({ event, handleBack, location }: Props) => {
  useEffect(() => {
    const test = document.getElementById(`content__${event.name}`);
    if (test) {
      test.innerHTML = event.content;
    }
  }, [event]);

  // const handleScroll = (e: React.UIEvent<HTMLElement>) => {
  //   if (window.innerWidth < 768) {
  //     if (e.currentTarget.scrollTop > 1) {
  //       gsap.to("#schedule", {
  //         duration: 0.5,
  //         ease: "power1.out",
  //         top: "30%",
  //       });
  //     } else {
  //       gsap.to("#schedule", {
  //         duration: 0.5,
  //         ease: "power1.out",
  //         top: "50%",
  //       });
  //     }
  //   }
  // };

  return (
    <div className="event">
      <div className="event__header">
        <button
          className="button small"
          onClick={() => {
            handleBack(event.location);
          }}
        >
          <span className="button__arrow left">←</span>
          <span className="hidden md:inline">{location}</span>
        </button>

        <div className="w-full">
          <h4 className="event__title">{event.title}</h4>
          <span>{event.name}</span>
        </div>
      </div>

      <div className="event__scroll">
        <div className="flex flex-row md:flex-col gap-15 mt-15 md:mb-15">
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
            <span className="event__tag location">{location}</span>
            {event.startTime && event.endTime ? (
              <>
                <span className="event__tag time">
                  {getTime(event.startTime)} - {getTime(event.endTime)}
                </span>
                {event.startTime2 && event.endTime2 && (
                  <span className="event__tag time">
                    {getTime(event.startTime2)} - {getTime(event.endTime2)}
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
    </div>
  );
};

export default Event;
