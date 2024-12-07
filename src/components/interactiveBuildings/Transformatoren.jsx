/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from 'react'
import { useGLTF, Html, meshBounds } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Transformatoren(props) {
  const { nodes } = useGLTF('models/transformatoren-no-materials.glb')
  const colorMap = useLoader(TextureLoader, 'models/textures/transformatoren-baked.webp')
  colorMap.flipY = false
  colorMap.colorSpace = SRGBColorSpace

  return (
    <group onClick={(e) => {
      e.stopPropagation()
      props.handleClick()
    }} dispose={null}>
        <group>
             <mesh
                 raycast={meshBounds}
                 geometry={nodes.transformatoren.geometry}
                 position={[1.014, 1.132, -4.375]}
                 rotation={[0, -1.568, 0]}
                 >              
                     <Html
                      position={ [0.1,0.75,0.25]}
                      distanceFactor={6}
                      occlude>
                       <p className='building-label'>Transformatoren</p>
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

useGLTF.preload('models/transformatoren-no-materials.glb')