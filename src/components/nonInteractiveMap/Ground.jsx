import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SRGBColorSpace } from 'three'

export default function Ground(props) {
  const { nodes} = useGLTF('models/ground.glb')
  const groundColorMap = useLoader(TextureLoader, 'models/textures/ground.jpg')
  groundColorMap.flipY = false
  groundColorMap.colorSpace = SRGBColorSpace

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ground.geometry}
        material={nodes.ground.material}
        position={[-0.138, -0.035, -0.012]}
        rotation={[0, -1.568, 0]}
      >
        <meshStandardMaterial 
          map={groundColorMap} />
      </mesh>
    </group>
  )
}

useGLTF.preload('models/ground.glb')