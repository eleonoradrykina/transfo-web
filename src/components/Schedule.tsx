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
}

const Schedule = ({ initialBuilding, events, initialEvent }: Props) => {
  const [filteredSchedule, setFilteredSchedule] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(
    initialBuilding
  );

  useEffect(() => {
    document.addEventListener("astro:after-swap", () => {
      console.log("astro:after-swap");
      if (initialBuilding && !initialEvent) {
        const defaultToBuilding = gsap.timeline({
          onComplete: () => {
            console.log("defaultToBuilding");
          },
        });
        defaultToBuilding
          .from(".schedule__default", {
            x: "0",
          })
          .from(
            ".schedule__building",
            {
              x: "100%",
            },
            "<"
          )
          .from(".schedule__event", { x: "200%" }, "<");
      }
      if (initialBuilding && initialEvent) {
        const buildingToEvent = gsap.timeline({
          paused: true,
          onComplete: () => {
            console.log("buildingToEvent");
          },
        });

        buildingToEvent
          .from(".schedule__default", {
            x: "-100%",
          })
          .from(
            ".schedule__building",
            {
              x: "0",
            },
            "<"
          )
          .from(".schedule__event", { x: "100%" }, "<");
      }
    });
    document.addEventListener("load", () => {
      console.log("load");
    });
  }, []);

  useEffect(() => {
    const event = events.find((event) => event.slug === initialEvent);

    if (event) {
      setSelectedEvent(event);
      // console.log(selectedEvent);
      // gsap.to(".schedule__default", {
      //   x: "-200%",
      //   duration: 0.1,
      //   ease: "power1.out",
      // });
      // gsap.to(".schedule__event", {
      //   x: "0%",
      //   duration: 0.1,
      //   ease: "power1.out",
      // });
    }

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    // const scheduleTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#body",
    //     start: "top top",
    //     end: "20",
    //     scrub: 1,
    //     onUpdate() {
    //       gsap.to("#schedule", {
    //         duration: 0.5,
    //         ease: "power1.out",
    //         x: "0vw",
    //       });

    //       gsap.to("#faq__button", {
    //         duration: 0.5,
    //         ease: "power1.out",
    //         x: "0vw",
    //       });

    //       gsap.to("#hero__title", {
    //         duration: 0.5,
    //         ease: "power1.out",
    //         x: "0vw",
    //       });

    //       gsap.to("#hero__date", {
    //         duration: 0.5,
    //         ease: "power1.out",
    //         x: "0vw",
    //       });
    //     },
    //   },
    // });

    // scheduleTL.from(
    //   "#schedule",
    //   {
    //     y: "100%",
    //   },
    //   "<"
    // );
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
      className={`schedule ${selectedBuilding && !selectedEvent ? "has-building" : ""} ${selectedEvent ? "has-event" : ""}`}
    >
      <div className="schedule__content">
        <div className="schedule__default">
          <h3 className="schedule__title">Programma</h3>
          <p>
            Heel het programma is weergegeven. Klik op het gebouw om te zien wat
            er daar plaatsvindt.
          </p>
          <ul className="schedule__list">
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
                    withLocation={!selectedBuilding}
                    event={event}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="schedule__building">
          <h3 className="schedule__title">{selectedBuilding}</h3>
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
