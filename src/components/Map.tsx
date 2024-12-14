import "../styles/components/map.css";
import { useState } from "react";
import type { IEvent } from "../services/types";
import { Bvh } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

interface Props {
  onChangeBuilding: (building: string | null) => void;
  onChangeEvent: (event: string | null) => void;
  selectedBuilding: string | null;
  selectedEvent: string | null;
  copy: any;
  events: IEvent[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onEnterBack: boolean | null;
  timeline: React.MutableRefObject<gsap.core.Timeline | undefined>;
}

export default function Map({
  onChangeBuilding,
  onChangeEvent,
  selectedBuilding,
  selectedEvent,
  copy,
  events,
  loading,
  setLoading,
  onEnterBack,
  timeline,
}: Props) {
  const [clearSelection, setClearSelection] = useState(0);

  return (
    <div className="map">
      <Canvas
        gl={{
          pixelRatio: 1,
        }}
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
            loading={loading}
            setLoading={setLoading}
            onEnterBack={onEnterBack}
            timeline={timeline}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
