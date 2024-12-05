import { useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";
import { type IEvent } from "../services/types";

interface Props {
  events: IEvent[];
}

const Interactivity = ({ events }: Props) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  return (
    <div className="interactivity">
      <Map onChangeBuilding={setSelectedBuilding} />
      <Schedule events={events} selectedBuilding={selectedBuilding} />
    </div>
  );
};
export default Interactivity;
