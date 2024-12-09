import { useEffect, useState } from "react";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";
import Map from "./Map";
import { gsap } from "gsap";

interface Props {
  events: IEvent[];
  copy: any;
}

const Interactivity = ({ events, copy }: Props) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      window.history.replaceState(
        {},
        document.title,
        `?building=${selectedBuilding}&event=${selectedEvent}`
      );
    } else if (selectedBuilding && !selectedEvent) {
      window.history.replaceState(
        {},
        document.title,
        `?building=${selectedBuilding}`
      );
    } else {
      window.history.replaceState({}, document.title, "/");
    }
  }, [selectedBuilding, selectedEvent]);

  return (
    <div className="interactivity">
      <Map
        copy={copy}
        events={events}
        selectedBuilding={selectedBuilding}
        selectedEvent={selectedEvent}
        onChangeBuilding={setSelectedBuilding}
        onChangeEvent={setSelectedEvent}
        setLoading={setLoading}
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
