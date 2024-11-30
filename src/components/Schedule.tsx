import { useEffect, useState } from "react";
import { SCHEDULE } from "../services/schedule";
import "../styles/components/schedule.css";
import EventPreview from "./EventPreview";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const Schedule = () => {
  const [filteredSchedule, setFilteredSchedule] = useState(SCHEDULE);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    const scheduleTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
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
  });

  return (
    <div id="schedule" className="schedule">
      <div className="schedule__content">
        <h3 className="schedule__title">Programma</h3>
        <p>
          Heel het programma is weergegeven. Klik op het gebouw om te zien wat
          er daar plaatsvindt.{" "}
        </p>
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
