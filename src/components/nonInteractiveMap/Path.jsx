/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from "react";
import gsap from 'gsap'

export default function Path(props) {
  const { nodes, materials } = useGLTF('/models/path.glb')
  const pathRef = useRef(null);

  const glowingUpPath = () => {
    if (props.timeline.current) {
      props.timeline.current.to(pathRef.current, {
        emissiveIntensity: 1.7,
        duration: 1,
        ease: "power2.out",
        }, 0);
    }
  };

  useEffect(() => {
    glowingUpPath();
  }, [props.timeline.current]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.path.geometry}
        material={materials['Material.004']}
        position={[1.094, 0.022, -2.899]}
        rotation={[0, 0.015, 0]}
        scale={[0.224, 0.034, 0.224]}
      >
        <meshStandardMaterial
          ref={pathRef}
          color="#918FFF"
          emissive="#918FFF"
          emissiveIntensity={props.intensity}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/path.glb')