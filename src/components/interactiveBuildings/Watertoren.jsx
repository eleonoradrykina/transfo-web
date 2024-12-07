/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Watertoren(props) {
  const { nodes } = useGLTF('models/watertoren-no-materials.glb')
  const colorMap = useLoader(TextureLoader, 'models/textures/watertoren-baked.webp')
  colorMap.flipY = false
  colorMap.colorSpace = SRGBColorSpace

  return (
    <group onClick={(e) => {
      e.stopPropagation()
      props.handleClick()
    }} dispose={null}>
      <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        position={[-0.665, 0.045, 2.214]}
        rotation={[0, -1.568, 0]}
      >
    
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle006.geometry}
        position={[-0.666, 2.098, 2.211]}
        rotation={[0, -1.568, 0]}
      >
           <Html
         position={ [0.1,0.75,0.25]}
         distanceFactor={7}
         occlude>
            <p 
            onClick={(e) => {
              e.stopPropagation()
              props.handleClick()
            }}
            className='building-label'>Watertoren</p>
        </Html>
        <meshStandardMaterial 
          map={colorMap}
          emissive="#BC78FF" 
          emissiveIntensity={props.emissiveIntensity} />
      </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('models/watertoren-no-materials.glb')