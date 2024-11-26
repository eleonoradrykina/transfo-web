import { OrbitControls, Html } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import MapModel from './MapModel'
import Hoofdzaal from './interactiveBuildings/Hoofdzaal'
import Mechaniekers from './interactiveBuildings/Mechaniekers'
import Ketelhuis from './interactiveBuildings/Ketelhuis'
import Transformatoren from './interactiveBuildings/Transformatoren'
import Octagon from './interactiveBuildings/Octagon'
import Kunstacademie from './interactiveBuildings/Kunstacademie'
import Duiktank from './interactiveBuildings/Duiktank'
import Watertoren from './interactiveBuildings/Watertoren'

import { useRef, useState, useEffect } from 'react'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { ToneMapping, EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'

import gsap from 'gsap'



export default function Experience() {

    let selectedMeshes = null
    const OrbitControlsRef = useRef()

    const clearSelection = (meshes) => {
        console.log('clearSelection')
         //turn off the light:
         if (meshes) {
             meshes.forEach(mesh => {
                 mesh.material.emissiveIntensity = 0
            })
         }   
    }

  const handleBuildingClick = (e, label) => {
    e.stopPropagation()
    clearSelection(selectedMeshes)
    console.log('building label', label)
    console.log(e.eventObject.children[0].children[0].position)
    setOrbitControls(e.eventObject.children[0].children[0].position, label)

    //set orbit controls:
    console.log(OrbitControlsRef.current)


    const newMeshes =  e.eventObject.children[0].children
    //light up the building:
    newMeshes.forEach(mesh => {
      mesh.material.emissiveIntensity = 3.0
    })

    selectedMeshes = newMeshes

  }

  const setOrbitControls = (position, label) => {

    const tl = gsap.timeline()
    
    // First zoom out to distance 15
    tl.to(OrbitControlsRef.current, {
        minDistance: 15.0,
        maxDistance: 15.0,
        duration: 0.75,
        ease: "power2.out"
    })
    //then change target
    .to(OrbitControlsRef.current.target, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 0.75,  // Adjust duration as needed
        ease: "power2.inOut"
    }, '<')
    // Then zoom in 
    .to(OrbitControlsRef.current, {
        minDistance: 8.0,
        maxDistance: 8.0,
        duration: 0.75,
        ease: "power2.in",
        onComplete: () => {
            // Reset the distance constraints after animation
            OrbitControlsRef.current.minDistance = cameraControls.minDistance
            OrbitControlsRef.current.maxDistance = cameraControls.maxDistance
        }
    })

  }

  const cameraControls = useControls('Camera',{
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
})
    return (
        <>
        <EffectComposer>
            <ToneMapping mode= {ToneMappingMode.OPTIMIZED_CINEON} />
            <Bloom luminanceThreshold={ 0.4 } 
            mipmapBlur 
            intensity={ 1.5 }/>
            {/* <DepthOfField 
                    focusDistance={0.06}
                    focalLength={0.02}
                    bokehScale={8} /> */}
        </EffectComposer>
        <Perf position="top-left"/>
        <OrbitControls 
           minDistance={cameraControls.minDistance}
           maxDistance={cameraControls.maxDistance}
           minAzimuthAngle={cameraControls.minAzimuthAngle}
           maxAzimuthAngle={cameraControls.maxAzimuthAngle}
           maxPolarAngle={cameraControls.maxPolarAngle}
           minPolarAngle={cameraControls.minPolarAngle}
           smoothTime = {cameraControls.smoothTime}
           draggingSmoothTime = {cameraControls.draggingSmoothTime}
           maxSpeed = {cameraControls.maxSpeed}
           azimuthRotateSpeed = {cameraControls.azimuthRotateSpeed}
           dampingFactor = {0.1}
           ref={OrbitControlsRef}
           />
        <ambientLight
        intensity={1.0} />
        <MapModel onClick={clearSelection}/>
        <Hoofdzaal onClick={(e) => handleBuildingClick(e, "Hoofdzaal")} label="Hoofdzaal" />
        <Mechaniekers onClick={(e) => handleBuildingClick(e, "Mechaniekers")} label="Mechaniekers" />
        <Ketelhuis onClick={(e) => handleBuildingClick(e, "Ketelhuis")} label="Ketelhuis" />
        <Transformatoren onClick={(e) => handleBuildingClick(e, "Transformatoren")} label="Transformatoren" />
        <Octagon onClick={(e) => handleBuildingClick(e, "Octagon")} label="Octagon" />
        <Kunstacademie onClick={(e) => handleBuildingClick(e, "Kunstacademie")} label="Kunstacademie" />
        <Duiktank onClick={(e) => handleBuildingClick(e, "Duiktank")} label="Duiktank" />
        <Watertoren onClick={(e) => handleBuildingClick(e, "Watertoren")} label="Watertoren" />
        </>
    )
    }   