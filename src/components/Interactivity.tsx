import { useEffect, useRef, useState } from "react";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";
import Map from "./Map";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  events: IEvent[];
  copy: any;
}

const Interactivity = ({ events, copy }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [onEnterBack, setEnterBack] = useState<boolean | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!loading) {
        timeline.current = gsap.timeline({
          scrollTrigger: {
            trigger: "#body",
            start: "top top",
            end: "20",
            onEnterBack: () => {
              setEnterBack(true);
              if (timeline.current) {
                timeline.current.reverse();
              }
            },
            onEnter: () => {
              setEnterBack(false);
            },
          },
        });

        timeline.current
          // SCHEDULE
          .from(
            "#schedule",
            {
              y: "100%",
              duration: 1,
            },
            0
          )
          // LABELS
          .to(
            ".building-label",
            {
              opacity: 1,
              cursor: "pointer",
              duration: 1,
              ease: "power2.out",
            },
            0
          );
      }
    },
    { dependencies: [loading], scope: container }
  );

  useEffect(() => {
    if (urlParams.get("building")) {
      if (
        Object.values(BUILDING).includes(urlParams.get("building") as BUILDING)
      ) {
        setSelectedBuilding(urlParams.get("building") ?? null);

        if (urlParams.get("event")) {
          setSelectedEvent(urlParams.get("event") ?? null);
        }

        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.set("html", {
        overflowY: "auto",
      });
      gsap.set(".loading", {
        display: "none",
      });
      gsap.to(".main", {
        opacity: 1,
        duration: 1,
      });
      gsap.to("#footer", {
        opacity: 1,
        duration: 1,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (selectedBuilding && selectedEvent) {
      window.history.pushState(
        {},
        document.title,
        `?building=${selectedBuilding}&event=${selectedEvent}`
      );
    } else if (selectedBuilding && !selectedEvent) {
      window.history.pushState(
        {},
        document.title,
        `?building=${selectedBuilding}`
      );
    } else {
      window.history.pushState({}, document.title, "/");
    }
  }, [selectedBuilding, selectedEvent]);

  return (
    <div ref={container} className="interactivity">
      <Map
        onEnterBack={onEnterBack}
        copy={copy}
        events={events}
        selectedBuilding={selectedBuilding}
        selectedEvent={selectedEvent}
        onChangeBuilding={setSelectedBuilding}
        onChangeEvent={setSelectedEvent}
        loading={loading}
        setLoading={setLoading}
        timeline={timeline}
      />
      <Schedule
        copy={copy}
        events={events}
        selectedBuilding={selectedBuilding}
        selectedEvent={selectedEvent}
        onChangeBuilding={setSelectedBuilding}
        onChangeEvent={setSelectedEvent}
      />
    </div>
  );
};
export default Interactivity;
