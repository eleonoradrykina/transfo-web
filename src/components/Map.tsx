import "../styles/components/map.css";
import { useState } from "react";
import type { IEvent } from "../services/types";

const { Canvas } = await import("@react-three/fiber");
const Experience = await import("./Experience");
const { Bvh } = await import("@react-three/drei");

interface Props {
  onChangeBuilding: (building: string | null) => void;
  onChangeEvent: (event: string | null) => void;
  selectedBuilding: string | null;
  selectedEvent: string | null;
  copy: any;
  events: IEvent[];
  setLoading: (loading: boolean) => void;
}

export default function Map({
  onChangeBuilding,
  onChangeEvent,
  selectedBuilding,
  selectedEvent,
  copy,
  events,
  setLoading,
}: Props) {
  const [clearSelection, setClearSelection] = useState(0);

  return (
    <div className="map">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [13, 7, 13],
        }}
        onPointerMissed={() => {
          onChangeBuilding(null);
          onChangeEvent(null);
          setClearSelection(clearSelection + 1);
        }}
      >
        <Bvh>
          <Experience.default
            copy={copy}
            events={events}
            selectedBuilding={selectedBuilding}
            selectedEvent={selectedEvent}
            clearSelection={clearSelection}
            onChangeBuilding={onChangeBuilding}
            onChangeEvent={onChangeEvent}
            setLoading={setLoading}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
