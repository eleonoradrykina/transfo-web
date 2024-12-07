import { Canvas } from "@react-three/fiber";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";
import { useState } from "react";

interface Props {
  onChangeBuilding: (building: string | null) => void;
}

export default function Map({ onChangeBuilding }: Props) {
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
          console.log("missed");
          onChangeBuilding(null);
        }}
      >
        <Bvh>
          <Experience
            clearSelection={clearSelection}
            onClickBuilding={onChangeBuilding}
          />
        </Bvh>
      </Canvas>
    </div>
  );
}
