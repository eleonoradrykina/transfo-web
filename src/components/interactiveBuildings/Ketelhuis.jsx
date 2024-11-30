/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Ketelhuis(props) {
  const { nodes, materials } = useGLTF('models/ketelhuis2.glb')
  const colorMap = useLoader(TextureLoader, 'models/textures/ketelhuis-baked2.jpg')
  colorMap.flipY = false
  colorMap.colorSpace = SRGBColorSpace
  return (
    <group {...props} dispose={null}>
      <group position={[-0.793, 0.87, -0.556]} rotation={[0, 0.009, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.building}
        >
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
         <Html
          position={ [0,2.125,0]}
          distanceFactor={6}
          occlude>
            <p className='building-label'>Ketelhuis</p>
          </Html>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_1.geometry}
          material={materials.roof}
        >
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
        </mesh>
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.roof}
          position={[0.001, 1.223, 0.559]}
          rotation={[0, -0.009, 0]}
        >
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube025.geometry}
          material={materials['Material.006']}
          position={[0.475, 0.788, 0.65]}
          rotation={[0, 0.005, 0]}
        >
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('models/ketelhuis2.glb')
