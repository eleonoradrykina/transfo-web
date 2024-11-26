import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

interface Props {
  onClick: (meshes: any) => void;
}

export default function MapModel({ onClick }: Props) {
  //the furtherst 1.24
  //the closest 0.7

  const mapControls = useControls("Map", {
    mapAngle: {
      value: 0,
      min: -3.14,
      max: 3.14159,
      step: 0.01,
    },
  });

  const model = useGLTF("./models/map-without-interactive.glb");
  // const model = useGLTF('./models/compressed_map-without-interactive-buildings.glb')

  return (
    <>
      <primitive
        onClick={onClick}
        object={model.scene}
        scale={1.0}
        rotation-y={mapControls.mapAngle}
        position={[0, 0, 0]}
      />
    </>
  );
}

useGLTF.preload("./models/map-without-interactive.glb");
// useGLTF.preload('./models/map-bachelors.glb')
