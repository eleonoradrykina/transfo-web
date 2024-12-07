import { useRef, useState, useEffect } from "react";
import { OrbitControls, CameraControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";

// import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

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

import gsap from "gsap";

const positions = new Map([["hoofdzaal", [-0.005, 0.584, -1.317]], ["mechaniekers", [0.573, 0.306, 0.635]], ["ketelhuis", [-0.793, 0.87, -0.556]], ["transformatoren", [1.014, 1.132, -4.375]], ["octagon", [1.89, -0.102, -1.122]], ["kunstacademie", [3.105, 0.186, -0.804]], ["duiktank", [1.0, 0.366, 4.596]], ["watertoren", [-0.665, 0.045, 2.214]], ["plong", [1.504, 0.12, -0.343]], ["hoogteparcours", [3.75,0,2.5]], ["waterbassin", [2.5,0,3.0]]]);

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

  const [isClickable, setIsClickable] = useState(false);

  const [usersGestures, setUsersGestures] = useState({
    left: 0,
    one: 0,
  });

  const cameraControlsRef = useRef();


  useEffect(() => {
    handleClear("useEffect");
  }, [clearSelection]);


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
    if (!isClickable) {
      console.log("not clickable");
      return;
    }
    handleClear("handleSelect");  
    onClickBuilding(key);
    setCameraControls(key);

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
    })

    window.history.pushState(
      {},
      "",
      `${window.location.origin}/?building=${key.toLowerCase()}`
    )
  }

  const setLabelsOpacity = () => {
    const tlLabels = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnter: () => {
          setIsClickable(true);
          console.log("isClickable", isClickable);
        },
        onEnterBack: () => {
          setIsClickable(false);
          console.log("isClickable", isClickable);
          tlLabels.reverse();
        }
      },
    });
    tlLabels.to(
      ".building-label",
      {
        opacity: 1,
        cursor: "pointer",
        duration: 0.75,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      ".map-label",
      {
        opacity: 1,
        duration: 0.75,
        ease: "power2.out",
      },
      "<"
    );
  }

  const setCameraControls = (key) => {
    const tl = gsap.timeline();

    const position = positions.get(key);
    const camera = [10, 5, 10]
    const offsetCenter = [5, 0, 0]; 

     if (cameraControlsRef.current) {
      // Lerp from current position to new position
      cameraControlsRef.current.lerpLookAt(
        ...camera,           // camera position
        ...offsetCenter,     // current target (scene center)
        ...camera,           // same camera position
        ...position,         // new target (building position)
        0.17,                // animation duration/strength (0-1)
        true                // enable transition
      );
    }
  }

  const setZoom = () => {
    const tlZoom = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnter: () => {
          cameraControlsRef.current.enabled = true;

          //move to the left and zoom in
          cameraControlsRef.current?.truck(3.5, 0, true)
          cameraControlsRef.current?.dolly(2, true)
          setUsersGestures({
            left: 1,
            one: 1,
          })
        },
        onEnterBack: () => {
          //move to the right and zoom out
          cameraControlsRef.current?.truck(-3.5, 0, true)
          cameraControlsRef.current?.dolly(-2, true)

          //set camera to default position
          cameraControlsRef.current.setLookAt(10, 5, 10, 0, 0, 0, true)

          setUsersGestures({
            left: 0,
            one: 0,
          })
   
          handleClear("setZoom")
          //also clear url params
          window.history.pushState({}, "", window.location.pathname)
        }
      },
    })
  }

  useEffect(() => {
    setLabelsOpacity();
    setZoom();
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("building")) {
      handleSelect(urlParams.get("building"))
    }
  }, []);

  const cameraControls = {
    minDistance: 10.0,
    maxDistance: 16.3,
    maxPolarAngle: 1.3,
    minPolarAngle: 0.8,
    maxAzimuthAngle: 1.1,
    minAzimuthAngle: -0.3,
  }

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.6} />
        <ToneMapping />
      </EffectComposer>
      <CameraControls 
        ref={cameraControlsRef}
        minDistance={cameraControls.minDistance}
        maxDistance={cameraControls.maxDistance}
        maxPolarAngle={cameraControls.maxPolarAngle}
        minPolarAngle={cameraControls.minPolarAngle}
        maxAzimuthAngle={cameraControls.maxAzimuthAngle}
        minAzimuthAngle={cameraControls.minAzimuthAngle}

        mouseButtons={{
          left: usersGestures.left,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
        touches={{
          one: usersGestures.one,
          two: 0,
          three: 0
        }}
      />
      <ambientLight intensity={1.5} />
       {/* <axesHelper
        args={[10]} 
        /> */}
       <Ground 
        handleClickParcours={() => handleSelect("hoogteparcours")}
        handleClickBassin={() => handleSelect("waterbassin")}
       />
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
