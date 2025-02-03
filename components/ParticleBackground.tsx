import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state, delta) => {
    particlesRef.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFFFFF" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export default ParticleBackground

