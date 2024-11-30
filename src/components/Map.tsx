import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";
import { useState } from "react";

interface Props {
  onChangeBuilding: (building: string | null) => void;
}

export default function Map({ onChangeBuilding }: Props) {
  const [clearSelection, setClearSelection] = useState(false);

  return (
    <div className="map">
      <Leva hidden />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [13, 7, 13],
        }}
        onPointerMissed={() => {
          console.log("missed");

          window.history.pushState({}, "", window.location.origin);
          setClearSelection(true);
        }}
      >
        <Bvh>
          <Experience
            updateClearSelection={setClearSelection}
            clearSelection={clearSelection}
            onClickBuilding={onChangeBuilding}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
