import { useEffect, useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";

interface Props {
  events: IEvent[];
  copy: any;
}

const Interactivity = ({ events, copy }: Props) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedEvent] = useState<string | null>(
    urlParams.get("event") ?? null
  );

  useEffect(() => {
    if (urlParams.get("building")) {
      console.log(urlParams.get("building"));
      if (
        Object.values(BUILDING).includes(urlParams.get("building") as BUILDING)
      ) {
        window.scrollTo(0, document.body.scrollHeight);
        setSelectedBuilding(urlParams.get("building") ?? null);
      } else {
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, []);

  return (
    <div className="interactivity">
      <Map
        copy={copy}
        initialBuilding={selectedBuilding}
        onChangeBuilding={setSelectedBuilding}
      />
      <Schedule
        copy={copy}
        events={events}
        initialBuilding={selectedBuilding}
        initialEvent={selectedEvent}
      />
    </div>
  );
};
export default Interactivity;
