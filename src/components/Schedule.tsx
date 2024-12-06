import { useEffect, useState } from "react";
import "../styles/components/schedule.css";
import EventPreview from "./EventPreview";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type IEvent } from "../services/types";

interface Props {
  selectedBuilding: string | null;
  events: IEvent[];
}

const Schedule = ({ selectedBuilding, events }: Props) => {
  const [filteredSchedule, setFilteredSchedule] = useState(events);

  useEffect(() => {
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
    <div id="schedule" className="schedule">
      <div className="schedule__content">
        <h3 className="schedule__title">{selectedBuilding ?? "Programma"}</h3>
        {selectedBuilding ? (
          <div></div>
        ) : (
          <p>
            Heel het programma is weergegeven. Klik op het gebouw om te zien wat
            er daar plaatsvindt.
          </p>
        )}

        <ul className="schedule__list">
          {filteredSchedule.map((event) => (
            <EventPreview key={event.title} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
