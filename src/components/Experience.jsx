import { useRef, useState, useEffect } from "react";
const { CameraControls } = await import("@react-three/drei");

import { useThree } from "@react-three/fiber";
const {
  ToneMapping,
  EffectComposer,
  Bloom,
} = await import("@react-three/postprocessing");

/* Non interactive map:*/
const MapModel = await import("./nonInteractiveMap/MapModel");
const Ground = await import("./nonInteractiveMap/Ground");
const OfficeBuilding = await import("./nonInteractiveMap/OfficeBuilding");
const Path = await import("./nonInteractiveMap/Path");
const Trees = await import("./nonInteractiveMap/Trees");

/* Interactive buldings:*/
const Hoofdzaal = await import("./interactiveBuildings/Hoofdzaal");
const Mechaniekers = await import("./interactiveBuildings/Mechaniekers");
const Ketelhuis = await import("./interactiveBuildings/Ketelhuis");
const Transformatoren = await import("./interactiveBuildings/Transformatoren");
const Octagon = await import("./interactiveBuildings/Octagon");
const Kunstacademie = await import("./interactiveBuildings/Kunstacademie");
const Duiktank = await import("./interactiveBuildings/Duiktank");
const Watertoren = await import("./interactiveBuildings/Watertoren");
const Plong = await import("./interactiveBuildings/Plong");

import gsap from "gsap";

const positions = new Map([["machinezaal-pompenzaal", [-0.005, 0.584, -1.317]], ["mechaniekers", [0.573, 0.306, 0.635]], ["ketelhuis", [-0.793, 0.87, -0.556]], ["transformatoren", [1.014, 1.132, -4.375]], ["octagon", [1.89, -0.102, -1.122]], ["directeurswoning", [3.105, 0.186, -0.804]], ["duiktank", [1.0, 0.366, 4.596]], ["watertoren", [-0.665, 0.045, 2.214]], ["plong", [1.504, 0.12, -0.343]], ["hoogteparcours", [3.75,0,2.5]], ["waterbassin", [2.5,0,3.0]], ["ingang", [2.0,0.25,-3.0]], ["markt", [0.3,0.25,-2.25]]]);

export default function Experience({ onChangeBuilding, onChangeEvent, clearSelection, selectedBuilding, selectedEvent, copy, events, setLoading }) {
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
  const [hasClickHappened, setHasClickHappened] = useState(false);
  const [timeAfterScroll, setTimeAfterScroll] = useState(null);


  const [usersGestures, setUsersGestures] = useState({
    left: 0,
    one: 0,
  });

  const cameraControlsRef = useRef();

  useEffect(() => {
    handleClear("useEffect");
  }, [clearSelection]);


  const handleClear = (location) => {
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

  const handleSelect = (key, fromEvent) => {
    // if (!isClickable) {
    //   return;
    // }
    setHasClickHappened(true);
    //set hotspot display to none:
    document.querySelector("#hotspot").style.display = "none";
    handleClear("handleSelect");
    if (!fromEvent) {
      onChangeBuilding(key);
      onChangeEvent(null);
    }  
    
        setCameraControls(key);


    switch (key) {
      case "machinezaal-pompenzaal": setHoofdzaalEmissiveIntensity(3.0); break;
      case "mechaniekers": setMechaniekersEmissiveIntensity(3.0); break;
      case "ketelhuis": setKetelhuisEmissiveIntensity(3); break;
      case "transformatoren": setTransformatorenEmissiveIntensity(3.0); break;
      case "octagon": setOctagonEmissiveIntensity(3.0); break;
      case "directeurswoning": setKunstacademieEmissiveIntensity(3.0); break;
      case "duiktank": setDuiktankEmissiveIntensity(3.0); break;
      case "watertoren": setWatertorenEmissiveIntensity(3.0); break;
      case "plong": setPlongEmissiveIntensity(3.0); break;
    }

  }

  const setLabelsOpacity = () => {
    const mm = gsap.matchMedia();
    const tlLabels = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnter: () => {
          mm.add("(min-width: 767px)", () => {
            //enable user gestures
          setUsersGestures({
            left: 1,
            one: 1,
          })

          //enable clickable buildings
          setIsClickable(true);
          //set time after scroll
          setTimeAfterScroll(Date.now());

          //move to the left and zoom in
          if (!selectedBuilding && !selectedEvent) {
                      cameraControlsRef.current?.truck(3.5, 0, true)
          cameraControlsRef.current?.dolly(2, true)
          }

          });
        

          
        },
        onEnterBack: () => {
          tlLabels.reverse();
          
          mm.add("(min-width: 767px)", () => {
            cameraControlsRef.current.setLookAt(10, 5, 10, 0, 0, 0, true);
            //disable clickable buildings
            setIsClickable(false);
  
            //move to the right and zoom out
            cameraControlsRef.current?.truck(-3.5, 0, true)
            cameraControlsRef.current?.dolly(-2, true)
  
            //set camera to default position
            cameraControlsRef.current.setLookAt(10, 5, 10, 0, 0, 0, true)
  
            //disable user gestures
            setUsersGestures({
              left: 0,
              one: 0,
            })
          });
          
        
        }
      },
      onReverseComplete: () => {
        onChangeBuilding(null);
        onChangeEvent(null);
      }
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
    
    mm.add("(max-width: 768px)", () => {
      tlLabels.to(".map", {
        y: "-20vh",
        duration: 0.75,
        ease: "power2.out",
      }, "<");
    });

    mm.add("(min-width: 768px)", () => {
      if (!hasClickHappened) {
        const tlHotspot = gsap.timeline({
          scrollTrigger: {
            trigger: "#body",
            start: "top top",
            end: "20",
            onEnterBack: () => {
              tlHotspot.to(
                  "#hotspot",
                {
                  opacity: 0,
                  ease: "power1.inOut"
                }
              )
            }
          }
        });
        tlHotspot.to(
            "#hotspot",
            {
              opacity: 1,
              delay: 4,
              ease: "power1.inOut"
            },
          ).to(
            "#hotspot__circle",
            { 
              strokeWidth: 4.2,
              repeat: -1,
              yoyo: true,
              duration: 1,
              ease: "power1.inOut"
            }
          )
        }
      })
    
    
  }

  const setCameraControls = (key) => {
    const position = positions.get(key);
    const camera = [10, 7, 10]
    const offsetCenter = [5, 1, 0]; 

     if (cameraControlsRef.current && window.innerWidth > 767) {
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


  useEffect(() => {
    if (selectedEvent) {
      const localEvent = events.find((event) => event.slug === selectedEvent) ?? null;
      if (localEvent) {
        handleSelect(localEvent.location, true);
      }
    } else
    {
      if (selectedBuilding) {
        handleSelect(selectedBuilding, false);
      }
      else {
        handleClear("useEffect2");
      }
    } 
  }, [selectedBuilding, selectedEvent]);
  

  useEffect(() => {
    setLabelsOpacity();
    setLoading(false);
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
       <Ground.default
       hoogteparcours={copy.buildings.hoogteparcours}
        waterbassin={copy.buildings.waterbassin}
        markt={copy.buildings.markt}
        ingang={copy.buildings.ingang} 
        handleClickParcours={() => handleSelect("hoogteparcours", false)}
        handleClickBassin={() => handleSelect("waterbassin", false)}
        handleClickIngang={() => handleSelect("ingang", false)}
        handleClickMarkt={() => handleSelect("markt", false)}
       />
       <Trees.default />
       <MapModel.default />
      <Path.default intensity={0.5} />
      <Hoofdzaal.default
        handleClick={() => handleSelect("machinezaal-pompenzaal", false)}
        emissiveIntensity={hoofdzaalEmissiveIntensity}
        label={copy.buildings["machinezaal-pompenzaal"]}
    />
      <Mechaniekers.default
        handleClick={() => handleSelect("mechaniekers", false)}
        emissiveIntensity={mechaniekersEmissiveIntensity}
        label={copy.buildings.mechaniekers}
      />
      <Ketelhuis.default
        handleClick={() => handleSelect("ketelhuis", false)}
        emissiveIntensity={ketelhuisEmissiveIntensity}
        label={copy.buildings.ketelhuis}
      />
      <Transformatoren.default
        handleClick={() => handleSelect("transformatoren", false)}
        emissiveIntensity={transformatorenEmissiveIntensity}
        label={copy.buildings.transformatoren}
      />
      <Octagon.default
        handleClick={() => handleSelect("octagon", false)}
        emissiveIntensity={octagonEmissiveIntensity}
        label={copy.buildings.octagon}
      />
      <Kunstacademie.default
        handleClick={() => handleSelect("directeurswoning", false)}
        emissiveIntensity={kunstacademieEmissiveIntensity}
        label={copy.buildings.directeurswoning}
      />
      <Duiktank.default
        handleClick={() => handleSelect("duiktank", false)}
        emissiveIntensity={duiktankEmissiveIntensity}
        label={copy.buildings.duiktank}

      />
      <Watertoren.default
        handleClick={() => handleSelect("watertoren", false)}
        emissiveIntensity={watertorenEmissiveIntensity}
        label={copy.buildings.watertoren}

      />
      <Plong.default
        handleClick={() => handleSelect("plong", false)}
        emissiveIntensity={plongEmissiveIntensity}
        label={copy.buildings.plong}
      />
       <OfficeBuilding.default />
    </>
  );
}
