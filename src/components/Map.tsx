import { Canvas } from "@react-three/fiber";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";
import { useState } from "react";
import type { IEvent } from "../services/types";

interface Props {
  onChangeBuilding: (building: string | null) => void;
  onChangeEvent: (event: string | null) => void;
  selectedBuilding: string | null;
  selectedEvent: string | null;
  copy: any;
  events: IEvent[];
}

export default function Map({
  onChangeBuilding,
  onChangeEvent,
  selectedBuilding,
  selectedEvent,
  copy,
  events,
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
          <Experience
            copy={copy}
            events={events}
            selectedBuilding={selectedBuilding}
            selectedEvent={selectedEvent}
            clearSelection={clearSelection}
            onChangeBuilding={onChangeBuilding}
            onChangeEvent={onChangeEvent}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
