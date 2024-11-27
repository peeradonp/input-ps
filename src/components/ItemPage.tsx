import { CameraControls, Center, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function Vaccine() {
    const { scene } = useGLTF("/vial_of_covid-19_vaccine.glb")
    const meshMain = useRef<THREE.Mesh>(undefined!)

    let clock = 0

    useFrame((state, delta) => {
        if (meshMain.current) {
            clock += delta // Increment the clock

            // Oscillate the Y-axis rotation (left to right)
            meshMain.current.rotation.y = Math.sin(clock) * 0.5

            // Float up and down (Y-axis position)
            meshMain.current.position.y = Math.sin(clock * 2) * 0.2 // Adjust 0.2 for float height
        }
    })

    return (
        <mesh castShadow receiveShadow ref={meshMain}>
            <Center>
                <primitive object={scene} />
            </Center>
        </mesh>
    )
}

export function ItemPage() {
    return (
        <Canvas camera={{ zoom: 1.5 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <Vaccine />
            <CameraControls makeDefault minDistance={3.75} maxDistance={4.75} />
        </Canvas>
    )
}

useGLTF.preload("/vial_of_covid-19_vaccine.glb")
