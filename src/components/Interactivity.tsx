import { useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";

const Interactivity = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  return (
    <div className="interactivity">
      <Map onChangeBuilding={setSelectedBuilding} />
      <Schedule selectedBuilding={selectedBuilding} />
    </div>
  );
};
export default Interactivity;
