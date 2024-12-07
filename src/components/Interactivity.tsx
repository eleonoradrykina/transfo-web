import { useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";
import { type IEvent } from "../services/types";

interface Props {
  events: IEvent[];
}

const Interactivity = ({ events }: Props) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(
    urlParams.get("building") ?? null
  );
  const [selectedEvent] = useState<string | null>(
    urlParams.get("event") ?? null
  );

  return (
    <div className="interactivity">
      {/* <Map onChangeBuilding={setSelectedBuilding} /> */}
      <Schedule
        events={events}
        initialBuilding={selectedBuilding}
        initialEvent={selectedEvent}
      />
    </div>
  );
};
export default Interactivity;
