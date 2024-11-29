import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";

export default function Map() {
  console.log("Map");

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
        onPointerMissed={() => console.log("pointer missed")}
      >
        <Bvh>
          <Experience />
        </Bvh>
      </Canvas>
    </div>
  );
}
