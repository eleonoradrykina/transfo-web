/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Plong(props) {
  const { nodes } = useGLTF('/models/plong.glb')
  const colorMap = useLoader(TextureLoader, '/models/textures/plong-baked.jpg')
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
        geometry={nodes.plong.geometry}
        position={[1.504, 0.12, -0.343]}
        rotation={[0, 0.009, 0]}
      >
          <Html
            position={ [-0.2,0.6,0.7]}
            distanceFactor={6}
            occlude>
              <p className='building-label'>plonggebouw</p>
            </Html>
        <meshStandardMaterial 
        map={colorMap}
        emissive="#BC78FF" 
        emissiveIntensity={props.emissiveIntensity}
        />
      </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/plong.glb')