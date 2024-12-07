/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'


export default function Duiktank(props) {
  const { nodes, materials } = useGLTF('/models/duiktank.glb')
  const colorMap = useLoader(TextureLoader, '/models/textures/duiktank-baked.jpg')
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
        castShadow
        receiveShadow
        geometry={nodes.duiktank.geometry}
        material={materials['rustiq-brown']}
        position={[1.496, 0.366, 4.596]}
        rotation={[0, -1.568, 0]}
        scale={[0.534, 0.35, 0.534]}
      >
        <Html
          position={ [0.2,2.75,0.25]}
          distanceFactor={6}
          occlude>
            <p className='building-label'>Duiktank - Zomerbar</p>
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

useGLTF.preload('/models/duiktank.glb')