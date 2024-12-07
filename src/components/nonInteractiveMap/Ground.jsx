import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Ground(props) {
  const { nodes} = useGLTF('/models/ground-no-materials.glb')
  const groundColorMap = useLoader(TextureLoader, '/models/textures/ground-baked.jpg')
  groundColorMap.flipY = false
  groundColorMap.colorSpace = SRGBColorSpace

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ground.geometry}
        position={[-0.138, -0.035, -0.012]}
        rotation={[0, -1.568, 0]}
      >
        <Html
          position={ [3.75,0.25,2.5]}
          distanceFactor={6}
          occlude>
            <p 
            onClick={(e) => {
              e.stopPropagation()
              props.handleClickParcours()
            }}
            className='building-label'>hoogteparcours</p>
        </Html>
        <Html
          position={ [2.5,0.25,3.0]}
          distanceFactor={6}
          occlude>
            <p 
            onClick={(e) => {
              e.stopPropagation()
              props.handleClickBassin()
            }}
            className='building-label'>waterbassin</p>
        </Html>
          <Html
          position={ [0.6,0.25,-2.4]}
          distanceFactor={6}
          occlude>
          <p className='map-label'>markt</p>
        </Html>
        <Html
          position={ [2.0,0.25,-3.0]}
          distanceFactor={6}
          occlude>
            <p className='map-label'>ingang</p>
        </Html>
        <meshStandardMaterial 
          map={groundColorMap} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/ground-no-materials.glb')
