/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Trees(props) {
  const { nodes, materials } = useGLTF('models/compressed_trees.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tree-1'].geometry}
        material={materials['stone-color.002']}
        position={[1.14, 0.125, 0.188]}
        rotation={[0, 0.015, 0]}
        scale={[0.005, 0.105, 0.005]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere008.geometry}
        material={materials['grass.001']}
      />
      <group position={[2.609, 0.125, 0.88]}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={materials['stone-color.002']}
        />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere012.geometry}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere013.geometry}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere014.geometry}
        material={materials['grass.001']}
      />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere016.geometry}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere017.geometry}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere020.geometry}
        position={[1.105, 0.226, 0.18]}
        material={materials['grass.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['grass.001']}
        position={[1.105, 0.226, 0.18]}
        rotation={[0, 0.015, 0]}
      />
    </group>
  )
}

useGLTF.preload('models/compressed_trees.glb')