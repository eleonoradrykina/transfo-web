import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Bvh } from "@react-three/drei";
import "../styles/components/map.css";
import Experience from "./Experience";

export default function Map() {
  console.log("Map");

  return (
    <div className="map">
      <Leva collapsed />
      <Canvas
        // onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }}
        flat
        gl={{
          // antialias: true,
          toneMappingExposure: 0.5,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [13, 5, 13],
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
