import { useEffect, useState } from "react";
import { type IEvent } from "../services/types";
import "../styles/components/schedule.css";
import { determineTimeTag } from "./EventPreview";

interface Props {
  event: IEvent;
  handleBack: (location: string) => void;
  location: string;
  time: number;
}

const Event = ({ event, handleBack, location, time }: Props) => {
  useEffect(() => {
    const test = document.getElementById(`content__${event.name}`);
    if (test) {
      test.innerHTML = event.content;
    }
  }, [event]);

  const [share, setShared] = useState(false);
  const [timeTag, setTimeTag] = useState(determineTimeTag(event));

  useEffect(() => {
    setTimeTag(determineTimeTag(event));
  }, [time]);

  useEffect(() => {
    if (share) {
      navigator.clipboard.writeText(
        `https://transfo-intiem.be/?building=${event.location}&event=${event.slug}`
      );

      const delay = setTimeout(() => {
        setShared(false);
        clearTimeout(delay);
      }, 3000);
    }
  }, [share]);

  return (
    <div className="event">
      <div className="event__header">
        <div className="flex flex-row md:w-full justify-between">
          <button
            className="button round"
            onClick={() => {
              handleBack(event.location);
            }}
          >
            <span className="button__arrow left">←</span>
            <span className="hidden md:inline">{location}</span>
          </button>
          <div className="hidden md:block">
            <button className=" button small" onClick={() => setShared(true)}>
              {share ? "Gekopieerd!" : "Delen"}
            </button>
          </div>
        </div>

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
          <div className="tags tags__event">
            {event.tags.map((tag) => (
              <span key={tag} className="tag regular">
                {tag}
              </span>
            ))}
            <span className="tag location">{location}</span>
            {timeTag}
          </div>
        </div>
        <div className="event__content">
          <div id={`content__${event.name}`}></div>
          <div className="md:hidden">
            <button
              className=" button small mx-auto"
              onClick={() => setShared(true)}
            >
              {share ? "Gekopieerd!" : "Delen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
