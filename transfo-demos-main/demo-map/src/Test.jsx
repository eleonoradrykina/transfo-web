import { useGLTF } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'


export default function Test() {

    const model = useGLTF('./models/lighting-test.glb')
    const colorMap = useLoader(TextureLoader, './models/textures/lighting-baked-test.jpg')
    colorMap.flipY = false


    return (
        <>
         <primitive object={model.scene} scale={ 1.0 } position = {[0.4, 0.4, 0.4]}>
         <meshStandardMaterial 
          map={colorMap} />
         </primitive>
         {/* <mesh position = {[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" />
         </mesh> */}
        </>
    )

}

useGLTF.preload('./models/lighting-test.glb')

