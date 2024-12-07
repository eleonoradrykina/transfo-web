/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'


export default function Duiktank(props) {
  const { nodes } = useGLTF('/models/duiktank-no-materials.glb')
  const colorMap = useLoader(TextureLoader, '/models/textures/duiktank-baked.webp')
  //make sure the texture is srgb
  colorMap.colorSpace = SRGBColorSpace
  colorMap.flipY = false

  return (
    <group onClick={(e) => {
      e.stopPropagation()
      props.handleClick()
    }} dispose={null}>
      <group>
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.duiktank.geometry}
        position={[1.496, 0.366, 4.596]}
        rotation={[0, -1.568, 0]}
        scale={[0.534, 0.35, 0.534]}
      >
        <Html
          position={ [0.4,2.1,1.0]}
          distanceFactor={7}
          occlude>
            <p 
            onClick={(e) => {
              e.stopPropagation()
              props.handleClick()
            }}
              className='building-label'>Duiktank - Zomerbar</p>
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

useGLTF.preload('/models/duiktank-no-materials.glb')
