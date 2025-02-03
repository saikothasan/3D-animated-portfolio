import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import type * as THREE from "three"
import { useSpring, animated } from "@react-spring/three"
import PortfolioContent from "./PortfolioContent"

const sections = ["About", "Projects", "Skills", "Contact"]

const PortfolioCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null!)
  const [activeFace, setActiveFace] = useState<string | null>(null)

  useFrame((state, delta) => {
    if (!activeFace && cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.2
      cubeRef.current.rotation.y += delta * 0.2
    }
  })

  const handleFaceClick = (face: string) => {
    setActiveFace(face)
  }

  return (
    <group>
      <mesh ref={cubeRef} onClick={(e) => e.stopPropagation()}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#4225F4" />
        {sections.map((section, index) => (
          <CubeFace
            key={section}
            position={[
              index === 0 ? 0 : index === 1 ? 1.51 : index === 2 ? 0 : -1.51,
              0,
              index === 0 ? 1.51 : index === 1 ? 0 : index === 2 ? -1.51 : 0,
            ]}
            rotation={[0, index === 0 ? 0 : index === 1 ? Math.PI / 2 : index === 2 ? Math.PI : -Math.PI / 2, 0]}
            text={section}
            onClick={() => handleFaceClick(section)}
          />
        ))}
      </mesh>
      {activeFace && <DetailView face={activeFace} onClose={() => setActiveFace(null)} />}
    </group>
  )
}

const CubeFace = ({
  position,
  rotation,
  text,
  onClick,
}: { position: [number, number, number]; rotation: [number, number, number]; text: string; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false)
  const { scale } = useSpring({ scale: hovered ? 1.1 : 1 })

  return (
    <group position={position} rotation={rotation}>
      <animated.mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#4225F4" />
      </animated.mesh>
      <Text color="white" anchorX="center" anchorY="middle" fontSize={0.5} font="/fonts/Inter-Bold.ttf">
        {text}
      </Text>
    </group>
  )
}

const DetailView = ({ face, onClose }: { face: string; onClose: () => void }) => {
  return (
    <group position={[0, 0, 2]}>
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#2A2A2A" />
      </mesh>
      <Html transform>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{face}</h2>
          <PortfolioContent face={face} />
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </Html>
    </group>
  )
}

export default PortfolioCube

