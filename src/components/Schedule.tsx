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
  initialEvent: string | null;
}

const Schedule = ({ selectedBuilding, events, initialEvent }: Props) => {
  const [filteredSchedule, setFilteredSchedule] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();

  useEffect(() => {
    const event = events.find((event) => event.slug === initialEvent);
    if (event) {
      setSelectedEvent(event);
      console.log(event.content);
    }

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    const scheduleTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        scrub: 1,
        onUpdate() {
          gsap.to("#schedule", {
            duration: 0.5,
            ease: "power1.out",
            x: "0vw",
          });

          gsap.to("#faq__button", {
            duration: 0.5,
            ease: "power1.out",
            x: "0vw",
          });

          gsap.to("#hero__title", {
            duration: 0.5,
            ease: "power1.out",
            x: "0vw",
          });

          gsap.to("#hero__date", {
            duration: 0.5,
            ease: "power1.out",
            x: "0vw",
          });
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

    mm.add("(max-width: 767px)", () => {});

    mm.add("(min-width: 768px)", () => {});
  }, []);

  useEffect(() => {
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
  }, [selectedBuilding]);

  return (
    <div
      id="schedule"
      className={`schedule ${selectedEvent ? "has-event" : ""}`}
    >
      <div className="schedule__content">
        <div className="schedule__default">
          <h3 className="schedule__title">
            {selectedBuilding ? selectedBuilding : "Programma"}
          </h3>
          {selectedBuilding ? (
            <div></div>
          ) : (
            <p>
              Heel het programma is weergegeven. Klik op het gebouw om te zien
              wat er daar plaatsvindt.
            </p>
          )}

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
                    withLocation={!selectedBuilding}
                    event={event}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="schedule__event">
          {selectedEvent && <Event event={selectedEvent} />}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
