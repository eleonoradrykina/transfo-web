import { useRef, useState, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

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

const positions = new Map([
  ["machinezaal-pompenzaal", [-0.005, 0.584, -1.317]],
  ["mechaniekers", [0.573, 0.306, 0.635]],
  ["ketelhuis", [-0.793, 0.87, -0.556]],
  ["transformatoren", [1.014, 1.132, -4.375]],
  ["octagon", [1.89, -0.102, -1.122]],
  ["directeurswoning", [3.105, 0.186, -0.804]],
  ["duiktank", [1.0, 0.366, 4.596]],
  ["watertoren", [-0.665, 0.045, 2.214]],
  ["plong", [1.504, 0.12, -0.343]],
  ["hoogteparcours", [3.75, 0, 2.5]],
  ["waterbassin", [2.5, 0, 3.0]],
  ["ingang", [2.0, 0.25, -3.0]],
  ["markt", [0.3, 0.25, -2.25]],
]);

export default function Experience({
  onChangeBuilding,
  onChangeEvent,
  clearSelection,
  selectedBuilding,
  selectedEvent,
  copy,
  events,
  loading,
  setLoading,
  onEnterBack,
  timeline
}) {
  const [hoofdzaaActive, setHoofdzaalActive] = useState(false);
  const [mechaniekersActive, setMechaniekersActive] = useState(false);
  const [ketelhuisActive, setKetelhuisActive] = useState(false);
  const [transformatorenActive, setTransformatorenActive] = useState(false);
  const [octagonActive, setOctagonActive] = useState(false);
  const [kunstacademieActive, setKunstacademieActive] = useState(false);
  const [duiktankActive, setDuiktankActive] = useState(false);
  const [watertorenActive, setWatertorenActive] = useState(false);
  const [plongActive, setPlongActive] = useState(false);
  const [hoogteparcoursActive, setHoogteparcoursActive] = useState(false);
  const [waterbassinActive, setWaterbassinActive] = useState(false);
  const [ingangActive, setIngangActive] = useState(false);
  const [marktActive, setMarktActive] = useState(false);

  //Global states:
  const [isClickable, setIsClickable] = useState(false);
  const [hasClickHappened, setHasClickHappened] = useState(false);
  const [timeAfterScroll, setTimeAfterScroll] = useState(null);

  //User gestures:
  const [usersGestures, setUsersGestures] = useState({
    left: 0,
    one: 0,
  });

  //Camera controls:
  const cameraControlsRef = useRef();

  const handleClear = () => {
    setHoofdzaalActive(false);
    setMechaniekersActive(false);
    setKetelhuisActive(false);
    setTransformatorenActive(false);
    setOctagonActive(false);
    setKunstacademieActive(false);
    setDuiktankActive(false);
    setWatertorenActive(false);
    setPlongActive(false);
    setHoogteparcoursActive(false);
    setWaterbassinActive(false);
    setIngangActive(false);
    setMarktActive(false);
  };

  const handleSelect = (key, fromEvent) => {
    setHasClickHappened(true);

    //set hotspot display to none:
    const hotspot = document.querySelector("#hotspot");

    if (hotspot) {
      hotspot.style.display = "none";
    }

    handleClear();
    if (!fromEvent) {
      onChangeBuilding(key);
      onChangeEvent(null);
    }

    setCameraControls(key);

    switch (key) {
      case "machinezaal-pompenzaal":
        setHoofdzaalActive(true);
        break;
      case "mechaniekers":
        setMechaniekersActive(true);
        break;
      case "ketelhuis":
        setKetelhuisActive(true);
        break;
      case "transformatoren":
        setTransformatorenActive(true);
        break;
      case "octagon":
        setOctagonActive(true);
        break;
      case "directeurswoning":
        setKunstacademieActive(true);
        break;
      case "duiktank":
        setDuiktankActive(true);
        break;
      case "watertoren":
        setWatertorenActive(true);
        break;
      case "plong":
        setPlongActive(true);
        break;
      case "hoogteparcours":
        setHoogteparcoursActive(true);
        break;
      case "waterbassin":
        setWaterbassinActive(true);
        break;
      case "ingang":
        setIngangActive(true);
        break;
      case "markt":
        setMarktActive(true);
        break;
    }
  };

  const setCameraControls = (key) => {
    const position = positions.get(key);
    const camera = [10, 7, 10];
    const offsetCenter = [5, 1, 0];

    if (cameraControlsRef.current && window.innerWidth > 768) {
      // Lerp from current position to new position
      cameraControlsRef.current.lerpLookAt(
        ...camera, // camera position
        ...offsetCenter, // current target (scene center)
        ...camera, // same camera position
        ...position, // new target (building position)
        0.17, // animation duration/strength (0-1)
        true // enable transition
      );
    }
  };

  useEffect(() => {
    if (onEnterBack !== null) {
      if (onEnterBack) {
        console.log("onEnterBack");
        disableCanvasInteraction();
        
      } else {
        console.log("onEnter");
        enableCanvasInteraction();
      }
    }
  }, [onEnterBack]);

  const enableCanvasInteraction = () => {
    document.querySelector("canvas").style.cursor = "pointer";

    //enable user gestures
    setUsersGestures({
      left: 1,
      one: 1,
    });

    //enable clickable buildings
    setIsClickable(true);
    //set time after scroll
    setTimeAfterScroll(Date.now());

    //move to the left and zoom in
    if (window.innerWidth > 768)
    {
      if (!selectedBuilding && !selectedEvent) {
        cameraControlsRef.current?.truck(3.5, 0, true);
        cameraControlsRef.current?.dolly(2, true);
      }
    }
    else {
      cameraControlsRef.current?.truck(0, 3.0, true);
    }
    
  };
  const disableCanvasInteraction = () => {
    

    //moving this from reverse complete:
    onChangeBuilding(null);
    onChangeEvent(null);
    if ((window.innerWidth > 768))
    {
      //set cursor of canvas to default
    document.querySelector("canvas").style.cursor = "default";

    //disable clickable buildings
    setIsClickable(false);



    //set camera to default position
    cameraControlsRef.current.setLookAt(10, 5, 10, 0, 0, 0, true);
    //disable user gestures
    setUsersGestures({
      left: 0,
      one: 0,
    });
          //move to the right and zoom out
    cameraControlsRef.current?.truck(-3.5, 0, true);
    cameraControlsRef.current?.dolly(-2, true);
    }
    else {
      cameraControlsRef.current?.truck(0, -3.0, true);
    }
  };

  useEffect(() => {
    handleClear();
  }, [clearSelection]);

  useEffect(() => {
    if (selectedEvent) {
      const localEvent =
        events.find((event) => event.slug === selectedEvent) ?? null;
      if (localEvent) {
        handleSelect(localEvent.location, true);
      }
    } else {
      if (selectedBuilding) {
        handleSelect(selectedBuilding, false);
      } else {
        handleClear();
      }
    }
  }, [selectedBuilding, selectedEvent]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const cameraControls = {
    minDistance: 10.0,
    maxDistance: 16.3,
    maxPolarAngle: 1.3,
    minPolarAngle: 0.8,
    maxAzimuthAngle: 1.1,
    minAzimuthAngle: -0.3,
  };

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
          three: 0,
        }}
      />
      <ambientLight intensity={1.5} />
      <Ground
        hoogteparcours={copy.buildings.hoogteparcours}
        hoogteparcoursActive={hoogteparcoursActive}
        waterbassin={copy.buildings.waterbassin}
        waterbassinActive={waterbassinActive}
        markt={copy.buildings.markt}
        marktActive={marktActive}
        ingang={copy.buildings.ingang}
        ingangActive={ingangActive}
        handleClickParcours={() => {
          if (isClickable) {
            handleSelect("hoogteparcours", false);
          }
        }}
        handleClickBassin={() => {
          if (isClickable) {
            handleSelect("waterbassin", false);
          }
        }}
        handleClickIngang={() => {
          if (isClickable) {
            handleSelect("ingang", false);
          }
        }}
        handleClickMarkt={() => {
          if (isClickable) {
            handleSelect("markt", false);
          }
        }}
      />
      <Trees />
      <MapModel />
      <Path timeline={timeline} intensity={0.5} />
      <Hoofdzaal
        handleClick={() => {
          if (isClickable) {
            handleSelect("machinezaal-pompenzaal", false);
          }
        }}
        active={hoofdzaaActive}
        label={copy.buildings["machinezaal-pompenzaal"]}
      />
      <Mechaniekers
        handleClick={() => {
          if (isClickable) {
            handleSelect("mechaniekers", false);
          }
        }}
        onEnterBack={onEnterBack}
        loading={loading}
        active={mechaniekersActive}
        label={copy.buildings.mechaniekers}
        hotspotGsap={() => hotspotInteraction()}
        hasClickHappened={hasClickHappened}
      />
      <Ketelhuis
        handleClick={() => {
          if (isClickable) {
            handleSelect("ketelhuis", false);
          }
        }}
        active={ketelhuisActive}
        label={copy.buildings.ketelhuis}
      />
      <Transformatoren
        handleClick={() => {
          if (isClickable) {
            handleSelect("transformatoren", false);
          }
        }}
        active={transformatorenActive}
        label={copy.buildings.transformatoren}
      />
      <Octagon
        handleClick={() => {
          if (isClickable) {
            handleSelect("octagon", false);
          }
        }}
        active={octagonActive}
        label={copy.buildings.octagon}
      />
      <Kunstacademie
        handleClick={() => {
          if (isClickable) {
            handleSelect("directeurswoning", false);
          }
        }}
        active={kunstacademieActive}
        label={copy.buildings.directeurswoning}
      />
      <Duiktank
        handleClick={() => {
          if (isClickable) {
            handleSelect("duiktank", false);
          }
        }}
        active={duiktankActive}
        label={copy.buildings.duiktank}
      />
      <Watertoren
        handleClick={() => {
          if (isClickable) {
            handleSelect("watertoren", false);
          }
        }}
        active={watertorenActive}
        label={copy.buildings.watertoren}
      />
      <Plong
        handleClick={() => {
          if (isClickable) {
            handleSelect("plong", false);
          }
        }}
        active={plongActive}
        label={copy.buildings.plong}
      />
      <OfficeBuilding />
    </>
  );
}
