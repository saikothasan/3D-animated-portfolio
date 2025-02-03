"use client"

import dynamic from "next/dynamic"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import NavControls from "@/components/NavControls"
import FallbackPortfolio from "@/components/FallbackPortfolio"

const PortfolioCube = dynamic(() => import("@/components/PortfolioCube"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false })

export default function Home() {
  const orbitControlsRef = useRef<any>(null)
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    setWebGLSupported(!!gl)
  }, [])

  const handleRotate = (axis: string, direction: number) => {
    if (orbitControlsRef.current) {
      const rotationSpeed = 1
      if (axis === "x") {
        orbitControlsRef.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), direction * rotationSpeed)
      } else if (axis === "y") {
        orbitControlsRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), direction * rotationSpeed)
      }
    }
  }

  if (webGLSupported === null) {
    return <div>Loading...</div>
  }

  if (!webGLSupported) {
    return <FallbackPortfolio />
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">My 3D Portfolio</h1>
      <div className="w-full h-[80vh]">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 7]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ParticleBackground />
            <PortfolioCube />
            <OrbitControls ref={orbitControlsRef} enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <NavControls onRotate={handleRotate} />
    </main>
  )
}

