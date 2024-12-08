import { useEffect, useState } from "react";
import "../styles/components/schedule.css";
import EventPreview from "./EventPreview";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type IEvent } from "../services/types";
import Event from "./Event";

interface Props {
  selectedBuilding: string | null;
  events: IEvent[];
  selectedEvent: string | null;
  copy: any;
  onChangeBuilding: (building: string | null) => void;
  onChangeEvent: (event: string | null) => void;
}

const Schedule = ({
  selectedBuilding,
  events,
  selectedEvent,
  copy,
  onChangeBuilding,
  onChangeEvent,
}: Props) => {
  const [localEvent, setLocalEvent] = useState<IEvent | null>(
    events.find((event) => event.slug === selectedEvent) ?? null
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
    selectedBuilding ? "onEvent" : selectedBuilding ? "onBuilding" : "onDefault"
  );

  useEffect(() => {
    setState(
      selectedEvent ? "onEvent" : selectedBuilding ? "onBuilding" : "onDefault"
    );
    if (selectedEvent) {
      setLocalEvent(
        events.find((event) => event.slug === selectedEvent) ?? null
      );
    } else {
      setLocalEvent(null);
    }
    setFilteredSchedule(
      events.filter((event) => {
        if (selectedBuilding) {
          return (
            event.location.toLowerCase() === selectedBuilding.toLowerCase()
          );
        } else {
          return true;
        }
      })
    );
  }, [selectedBuilding, selectedEvent]);

  const handleEventClick = (event: IEvent) => {
    setLocalEvent(event);
    console.log("event", event);
    onChangeEvent(event.slug);
    setState("onEvent");
  };

  const handleBack = (location: string) => {
    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      setState("onDefault");
      onChangeBuilding(null);
    });

    mm.add("(min-width: 768px)", () => {
      setState("onBuilding");
      if (!selectedBuilding) {
        onChangeBuilding(location);
      }
    });
    onChangeEvent(null);
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
          {localEvent && (
            <Event
              location={copy.buildings[localEvent.location]}
              handleBack={handleBack}
              event={localEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
