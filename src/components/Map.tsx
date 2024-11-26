import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";

import Experience from "./Experience";

export default function Map() {
  return (
    <div className="map">
      <Leva collapsed />
      <Canvas
        //  flat
        shadows
        gl={{
          // antialias: true,
          toneMappingExposure: 0.5,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [2, 5, 10],
        }}
        onPointerMissed={() => console.log("pointer missed")}
      >
        <Bvh>
          <Experience />
        </Bvh>
      </Canvas>
    </div>
  );
}
