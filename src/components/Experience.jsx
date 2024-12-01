import { OrbitControls, Html } from "@react-three/drei";
import { Perf } from "r3f-perf";

/* Non interactive map:*/
import MapModel from "./nonInteractiveMap/MapModel";
import Ground from "./nonInteractiveMap/Ground";
import OfficeBuilding from "./nonInteractiveMap/OfficeBuilding";
import Path from "./nonInteractiveMap/Path";
import Trees from "./nonInteractiveMap/Trees";

/* Interactive buldings:*/
import Hoofdzaal from "./interactiveBuildings/Hoofdzaal";
import Mechaniekers from "./interactiveBuildings/Mechaniekers";
import Ketelhuis from "./interactiveBuildings/Ketelhuis";
import Transformatoren from "./interactiveBuildings/Transformatoren";
import Octagon from "./interactiveBuildings/Octagon";
import Kunstacademie from "./interactiveBuildings/Kunstacademie";
import Duiktank from "./interactiveBuildings/Duiktank";
import Watertoren from "./interactiveBuildings/Watertoren";
import Plong from "./interactiveBuildings/Plong";

import { useRef, useState, useEffect } from "react";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

import gsap from "gsap";
import { update } from "three/examples/jsm/libs/tween.module.js";

const positions = new Map([["hoofdzaal", [-0.005, 0.584, -1.317]], ["mechaniekers", [0.573, 0.306, 0.635]], ["ketelhuis", [-0.793, 0.87, -0.556]], ["transformatoren", [1.014, 1.132, -4.375]], ["octagon", [1.89, -0.102, -1.122]], ["kunstacademie", [3.105, 0.186, -0.804]], ["duiktank", [1.496, 0.366, 4.596]], ["watertoren", [-0.665, 0.045, 2.214]], ["plong", [1.504, 0.12, -0.343]]]);



export default function Experience({ onClickBuilding, clearSelection }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [hoofdzaalEmissiveIntensity, setHoofdzaalEmissiveIntensity] = useState(0);
  const [mechaniekersEmissiveIntensity, setMechaniekersEmissiveIntensity] = useState(0);
  const [ketelhuisEmissiveIntensity, setKetelhuisEmissiveIntensity] = useState(0);
  const [transformatorenEmissiveIntensity, setTransformatorenEmissiveIntensity] = useState(0);
  const [octagonEmissiveIntensity, setOctagonEmissiveIntensity] = useState(0);
  const [kunstacademieEmissiveIntensity, setKunstacademieEmissiveIntensity] = useState(0);
  const [duiktankEmissiveIntensity, setDuiktankEmissiveIntensity] = useState(0);
  const [watertorenEmissiveIntensity, setWatertorenEmissiveIntensity] = useState(0);
  const [plongEmissiveIntensity, setPlongEmissiveIntensity] = useState(0);

  useEffect(() => {
    handleClear("useEffect");
  }, [clearSelection]);
  const OrbitControlsRef = useRef();

  const handleClear = (location) => {
    console.log("clearing", location);
    setHoofdzaalEmissiveIntensity(0);
    setMechaniekersEmissiveIntensity(0);
    setKetelhuisEmissiveIntensity(0);
    setTransformatorenEmissiveIntensity(0);
    setOctagonEmissiveIntensity(0);
    setKunstacademieEmissiveIntensity(0);
    setDuiktankEmissiveIntensity(0);
    setWatertorenEmissiveIntensity(0);
    setPlongEmissiveIntensity(0);
  };

  const handleSelect = (key) => {
    handleClear("handleSelect");  
    onClickBuilding(key);
    setOrbitControls(key);

    switch (key) {
      case "hoofdzaal": setHoofdzaalEmissiveIntensity(3.0); break;
      case "mechaniekers": setMechaniekersEmissiveIntensity(3.0); break;
      case "ketelhuis": setKetelhuisEmissiveIntensity(3); break;
      case "transformatoren": setTransformatorenEmissiveIntensity(3.0); break;
      case "octagon": setOctagonEmissiveIntensity(3.0); break;
      case "kunstacademie": setKunstacademieEmissiveIntensity(3.0); break;
      case "duiktank": setDuiktankEmissiveIntensity(3.0); break;
      case "watertoren": setWatertorenEmissiveIntensity(3.0); break;
      case "plong": setPlongEmissiveIntensity(3.0); break;
    }
    
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });

      window.history.pushState(
        {},
        "",
        `${window.location.origin}/?building=${key.toLowerCase()}`
      );
  };

  const setOrbitControls = (key) => {
    const tl = gsap.timeline();

    const position = positions.get(key);

    if (OrbitControlsRef.current) {
      // First zoom out to distance 15
      // tl.to(OrbitControlsRef.current, {
      //   minDistance: 14.0,
      //   maxDistance: 14.0,
      //   duration: 1.25,
      //   ease: "power2.out",
      // })
        //then change target
        tl.to(
          OrbitControlsRef.current.target,
          {
            x: position[0],
            y: position[1],
            z: position[2],
            duration: 1.25, // Adjust duration as needed
            ease: "power2.inOut",
          },
          "<"
        )
        // Then zoom in
        .to(OrbitControlsRef.current, {
          minDistance: 9.0,
          maxDistance: 9.0,
          duration: 1.25,
          ease: "power2.out",
          
          onComplete: () => {
            if (OrbitControlsRef.current) {
              // Reset the distance constraints after animation
              OrbitControlsRef.current.minDistance = cameraControls.minDistance;
              OrbitControlsRef.current.maxDistance = cameraControls.maxDistance;
            }
          },
        }, "<");
    }
  };

  const setLabelsOpacity = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    tl.to(
      ".building-label",
      {
        opacity: 1,
        duration: 0.75,
        ease: "power2.out",
      },
      "<"
    );
    tl.to(
      OrbitControlsRef.current,
      {
        minDistance: 12.0,
        maxDistance: 12.0,
        duration: 1.25,
        ease: "power2.out",
        onComplete: () => {
            if (OrbitControlsRef.current) {
              // Reset the distance constraints after animation
              OrbitControlsRef.current.minDistance = cameraControls.minDistance;
              OrbitControlsRef.current.maxDistance = cameraControls.maxDistance;
            }
        }
        },
      "<"
    );
  };

  useEffect(() => {
    setLabelsOpacity();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("building")) {
      handleSelect(urlParams.get("building"));
    }
  }, []);





  const cameraControls = useControls("Camera", {
    minDistance: {
      value: 5.1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    maxDistance: {
      value: 16.3,
      min: 5,
      max: 100,
      step: 0.1,
    },
    minAzimuthAngle: {
      value: -0.4,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    maxAzimuthAngle: {
      value: 0.81,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    maxPolarAngle: {
      value: 1.26,
      min: 0,
      max: Math.PI,
      step: 0.01,
    },
    minPolarAngle: {
      value: 0.86,
      min: 0,
      max: Math.PI,
      step: 0.01,
    },
    smoothTime: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.01,
    },
    draggingSmoothTime: {
      value: 0.125,
      min: 0,
      max: 1,
      step: 0.01,
    },
    maxSpeed: {
      value: 1.5,
      min: 0,
      max: 10,
      step: 0.01,
    },
    azimuthRotateSpeed: {
      value: 1.0,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });
  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.6} />
        <ToneMapping />
      </EffectComposer>
      {/* <Perf position="top-left" /> */}
      <OrbitControls
        minDistance={cameraControls.minDistance}
        maxDistance={cameraControls.maxDistance}
        minAzimuthAngle={cameraControls.minAzimuthAngle}
        maxAzimuthAngle={cameraControls.maxAzimuthAngle}
        maxPolarAngle={cameraControls.maxPolarAngle}
        minPolarAngle={cameraControls.minPolarAngle}
        smoothTime={cameraControls.smoothTime}
        draggingSmoothTime={cameraControls.draggingSmoothTime}
        maxSpeed={cameraControls.maxSpeed}
        azimuthRotateSpeed={cameraControls.azimuthRotateSpeed}
        dampingFactor={0.05}
        enableDamping={true}
        enableZoom={false}
        ref={OrbitControlsRef}
      />
      <ambientLight intensity={1.5} />
      <Ground />
      <Trees />
      <MapModel />
      <Path intensity={0.5} />
      <Hoofdzaal
      handleClick={() => handleSelect("hoofdzaal")}
      emissiveIntensity={hoofdzaalEmissiveIntensity}
    />
      <Mechaniekers
       handleClick={() => handleSelect("mechaniekers")}
        emissiveIntensity={mechaniekersEmissiveIntensity}
      />
      <Ketelhuis
        handleClick={() => handleSelect("ketelhuis")}
        emissiveIntensity={ketelhuisEmissiveIntensity}
      />
      <Transformatoren
        handleClick={() => handleSelect("transformatoren")}
        emissiveIntensity={transformatorenEmissiveIntensity}
      />
      <Octagon
       handleClick={() => handleSelect("octagon")}
        emissiveIntensity={octagonEmissiveIntensity}
      />
      <Kunstacademie
        handleClick={() => handleSelect("kunstacademie")}
        emissiveIntensity={kunstacademieEmissiveIntensity}
      />
      <Duiktank
        handleClick={() => handleSelect("duiktank")}
        emissiveIntensity={duiktankEmissiveIntensity}
      />
      <Watertoren
        handleClick={() => handleSelect("watertoren")}
        emissiveIntensity={watertorenEmissiveIntensity}
      />
      <Plong
        handleClick={() => handleSelect("plong")}
        emissiveIntensity={plongEmissiveIntensity}
      />
      <OfficeBuilding />
    </>
  );
}
