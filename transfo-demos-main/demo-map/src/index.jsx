import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { CineonToneMapping } from 'three'
import { Leva } from 'leva'
import { Bvh } from '@react-three/drei'
import './index.css'

import Map from './Map'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Map />
  </StrictMode>
)
