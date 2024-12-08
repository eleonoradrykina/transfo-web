import { useEffect, useState } from "react";
import "../styles/components/schedule.css";
import EventPreview from "./EventPreview";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type IEvent } from "../services/types";
import Event from "./Event";

interface Props {
  initialBuilding: string | null;
  events: IEvent[];
  initialEvent: string | null;
  copy: any;
  onChangeBuilding: (building: string | null) => void;
}

const Schedule = ({ initialBuilding, events, initialEvent, copy }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(
    events.find((event) => event.slug === initialEvent) ?? null
  );
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(
    initialBuilding
  );
  const [filteredSchedule, setFilteredSchedule] = useState(
    events.filter((event) => {
      if (selectedBuilding) {
        return event.location.toLowerCase() === selectedBuilding.toLowerCase();
      } else {
        return true;
      }
    })
  );

  const [state, setState] = useState<"onDefault" | "onBuilding" | "onEvent">(
    initialEvent ? "onEvent" : initialBuilding ? "onBuilding" : "onDefault"
  );

  useEffect(() => {
    setState(initialBuilding ? "onBuilding" : "onDefault");
    setSelectedEvent(null);
    setFilteredSchedule(events);
    setSelectedBuilding(initialBuilding);
    setFilteredSchedule(
      events.filter((event) => {
        if (initialBuilding) {
          return event.location.toLowerCase() === initialBuilding.toLowerCase();
        } else {
          return true;
        }
      })
    );

    window.history.replaceState(
      {},
      "",
      initialBuilding ? "?building=" + initialBuilding : window.location.origin
    );
  }, [initialBuilding]);

  const handleEventClick = (event: IEvent) => {
    if (!selectedBuilding) {
      setSelectedBuilding(event.location);
    }
    setSelectedEvent(event);
    setState("onEvent");
    window.history.replaceState(
      {},
      "",
      `?building=${event.location}&event=${event.slug}`
    );
  };

  const handleBack = (location: string) => {
    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      setState("onDefault");
      setSelectedBuilding(null);
      window.history.replaceState({}, "", window.location.origin);
    });
    mm.add("(min-width: 768px)", () => {
      setState("onBuilding");
      window.history.replaceState({}, "", `?building=${location}`);
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (window.innerWidth < 768) {
      if (e.currentTarget.scrollTop > 100) {
        gsap.to("#schedule", {
          duration: 0.5,
          ease: "power1.out",
          top: "35%",
        });
      } else {
        gsap.to("#schedule", {
          duration: 0.5,
          ease: "power1.out",
          top: "50%",
        });
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scheduleTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnterBack: () => {
          scheduleTL.reverse();
        },
      },
    });

    scheduleTL.from(
      "#schedule",
      {
        y: "100%",
      },
      "<"
    );
  }, []);

  return (
    <div id="schedule" className={`schedule ${state}`}>
      <div className="schedule__content">
        <div className="schedule__default">
          <h3 className="schedule__title">Programma</h3>
          <p className="hidden md:inline">
            Heel het programma is weergegeven. Klik op het gebouw om te zien wat
            er daar plaatsvindt.
          </p>
          <ul onScroll={handleScroll} className="schedule__list">
            {events
              .sort((a: IEvent, b: IEvent) => {
                if (a.startTime && b.startTime) {
                  return a.startTime.getTime() - b.startTime.getTime();
                } else if (a.startTime && !b.startTime) {
                  return -1;
                } else if (!a.startTime && b.startTime) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map((event) => (
                <li key={event.title}>
                  <EventPreview
                    handleClick={() => handleEventClick(event)}
                    location={
                      selectedBuilding ? null : copy.buildings[event.location]
                    }
                    event={event}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="schedule__building">
          <h3 className="schedule__title">
            {copy.buildings[selectedBuilding ?? "default"]}
          </h3>
          <ul className="schedule__list">
            {filteredSchedule
              .sort((a: IEvent, b: IEvent) => {
                if (a.startTime && b.startTime) {
                  return a.startTime.getTime() - b.startTime.getTime();
                } else if (a.startTime && !b.startTime) {
                  return -1;
                } else if (!a.startTime && b.startTime) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map((event) => (
                <li key={event.title}>
                  <EventPreview
                    handleClick={() => handleEventClick(event)}
                    location={
                      selectedBuilding ? null : copy.buildings[event.location]
                    }
                    event={event}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="schedule__event">
          {selectedEvent && (
            <Event
              location={copy.buildings[selectedEvent.location]}
              handleBack={handleBack}
              event={selectedEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
