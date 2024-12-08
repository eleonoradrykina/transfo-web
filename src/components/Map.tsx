import { Canvas } from "@react-three/fiber";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";
import { useState } from "react";

interface Props {
  onChangeBuilding: (building: string | null) => void;
  initialBuilding: string | null;
  copy: any;
  timeline: gsap.core.Timeline;
}

export default function Map({
  onChangeBuilding,
  initialBuilding,
  copy,
  timeline,
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
          setClearSelection(clearSelection + 1);
        }}
      >
        <Bvh>
          <Experience
            timeline={timeline}
            copy={copy}
            initialBuilding={initialBuilding}
            clearSelection={clearSelection}
            onClickBuilding={onChangeBuilding}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
