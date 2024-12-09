import { useEffect, useState } from "react";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";
import Map from "./Map";

interface Props {
  events: IEvent[];
  copy: any;
}

const Interactivity = ({ events, copy }: Props) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    if (urlParams.get("building") && window.innerWidth > 768) {
      if (
        Object.values(BUILDING).includes(urlParams.get("building") as BUILDING)
      ) {
        window.scrollTo(0, document.body.scrollHeight);
        setSelectedBuilding(urlParams.get("building") ?? null);
      } else {
        window.history.replaceState({}, document.title, "/");
      }
    }
    if (urlParams.get("event")) {
      setSelectedEvent(urlParams.get("event") ?? null);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, []);

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
