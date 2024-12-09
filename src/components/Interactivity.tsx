import { useEffect, useState } from "react";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";
const Map = await import("./Map");

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
      {loading && <pre className="fixed top-0 left-0 z-40">LOADING</pre>}
      <Map.default
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
