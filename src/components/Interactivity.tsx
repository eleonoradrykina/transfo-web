import { useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";
import { type IEvent, type IEventFull } from "../services/types";

interface Props {
  events: IEvent[];
  initialBuilding: string | undefined;
  initialEvent: string | undefined;
}

const Interactivity = ({ events, initialBuilding, initialEvent }: Props) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(
    initialBuilding ?? null
  );
  const [selectedEvent, setSelectedEvent] = useState<string | null>(
    initialEvent ?? null
  );

  return (
    <div className="interactivity">
      <Map onChangeBuilding={setSelectedBuilding} />
      <Schedule
        events={events}
        selectedBuilding={selectedBuilding}
        initialEvent={selectedEvent}
      />
    </div>
  );
};
export default Interactivity;
