import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { CineonToneMapping } from 'three'
import { Leva } from 'leva'
import { Bvh } from '@react-three/drei'
import "../styles/components/map.css";

import Experience from './Experience'

export default function Map() {

  return (
    <>
      <Leva collapsed />
       <Canvas 
       //  flat
        shadows
        gl= { { 
            // antialias: true,
             toneMappingExposure: 0.5
        } }
        camera={ {
            fov: 45,
            near: 0.1,
            far: 100,
            position: [ 2, 5, 10 ]
        } }
        onPointerMissed={() => console.log('pointer missed')}
    >
        <Bvh>
            <Experience />
        </Bvh>
    </Canvas>
    </>
  )
}