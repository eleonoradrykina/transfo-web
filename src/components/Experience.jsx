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



export default function Experience({ onClickBuilding, clearSelection, updateClearSelection }) {
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
  const OrbitControlsRef = useRef();

  const handleClear = () => {
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
    handleClear();
    updateClearSelection(false);    
    onClickBuilding(key);
    switch (key) {
      case "hoofdzaal": setHoofdzaalEmissiveIntensity(3.0); break;
      case "mechaniekers": setMechaniekersEmissiveIntensity(3.0); break;
      case "ketelhuis": setKetelhuisEmissiveIntensity(3.0); break;
      case "transformatoren": setTransformatorenEmissiveIntensity(3.0); break;
      case "octagon": setOctagonEmissiveIntensity(3.0); break;
      case "kunstacademie": setKunstacademieEmissiveIntensity(3.0); break;
      case "duiktank": setDuiktankEmissiveIntensity(3.0); break;
      case "watertoren": setWatertorenEmissiveIntensity(3.0); break;
      case "plong": setPlongEmissiveIntensity(3.0); break;
    }
      window.history.pushState(
        {},
        "",
        `${window.location.origin}/?building=${key.toLowerCase()}`
      );
  };

  const setOrbitControls = (position, label) => {
    const tl = gsap.timeline();

    if (OrbitControlsRef.current) {
      // First zoom out to distance 15
      tl.to(OrbitControlsRef.current, {
        minDistance: 14.0,
        maxDistance: 14.0,
        duration: 1.25,
        ease: "power2.out",
      })
        //then change target
        .to(
          OrbitControlsRef.current.target,
          {
            x: position.x,
            y: position.y,
            z: position.z,
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
        });
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

  useEffect(() => {
    handleClear();
  }, [clearSelection]);



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
      onClick={(e) => 
        {
          e.stopPropagation();
          handleSelect("hoofdzaal")
        }}
      emissiveIntensity={hoofdzaalEmissiveIntensity}
    />
      <Mechaniekers
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("mechaniekers");
        }}
        emissiveIntensity={mechaniekersEmissiveIntensity}
      />
      <Ketelhuis
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("ketelhuis");
        }}
        emissiveIntensity={ketelhuisEmissiveIntensity}
      />
      <Transformatoren
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("transformatoren");
        }}
        emissiveIntensity={transformatorenEmissiveIntensity}
      />
      <Octagon
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("octagon");
        }}
        emissiveIntensity={octagonEmissiveIntensity}
      />
      <Kunstacademie
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("kunstacademie");
        }}
        emissiveIntensity={kunstacademieEmissiveIntensity}
      />
      <Duiktank
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("duiktank");
        }}
        emissiveIntensity={duiktankEmissiveIntensity}
      />
      <Watertoren
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("watertoren");
        }}
        emissiveIntensity={watertorenEmissiveIntensity}
      />
      <Plong
        onClick={(e) => {
          e.stopPropagation();
          handleSelect("plong");
        }}
        emissiveIntensity={plongEmissiveIntensity}
      />
      <OfficeBuilding />
    </>
  );
}
