import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Sphere, MeshDistortMaterial, Stars, Text3D, Center, Torus, Icosahedron, Octahedron, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix for React Three Fiber elements not being recognized in JSX.IntrinsicElements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshPhysicalMaterial: any;
      icosahedronGeometry: any;
      octahedronGeometry: any;
      torusGeometry: any;
      ringGeometry: any;
      cylinderGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
    }
  }
}

type PillarData = {
  name: string;
  sub: string;
  color: string;
  position: [number, number, number];
  description: string;
};

const Pillars: PillarData[] = [
  { 
    name: "Economic", 
    sub: "Development", 
    color: "#F4CF57", 
    position: [3, 0, 0],
    description: "Foster a competitive and diversified economy capable of meeting the needs of all its people and securing a high standard of living for future generations."
  },
  { 
    name: "Human", 
    sub: "Development", 
    color: "#F4CF57", 
    position: [0, 0, 3],
    description: "Develop a modern, world-class educational and healthcare system that empowers the people of Qatar to sustain a prosperous society."
  },
  { 
    name: "Social", 
    sub: "Development", 
    color: "#F4CF57", 
    position: [-3, 0, 0],
    description: "Maintain a just and caring society based on high moral standards and capable of playing a significant role in global partnerships for development."
  },
  { 
    name: "Environmental", 
    sub: "Development", 
    color: "#F4CF57", 
    position: [0, 0, -3],
    description: "Manage the environment to ensure harmony between economic growth, social development, and environmental protection."
  }
];

// Realistic Gold PBR Material Props
const GOLD_MATERIAL_PROPS = {
  color: "#FFD700",        // Richer Gold
  emissive: "#B8860B",     // Slight self-illumination for shadows
  emissiveIntensity: 0.1,
  metalness: 1,            // Fully metallic
  roughness: 0.12,         // Polished but realistic
  clearcoat: 1,            // Varnish layer
  clearcoatRoughness: 0.1,
  reflectivity: 1,
  envMapIntensity: 2       // Stronger reflections
};

// Realistic Navy PBR Material Props (For Text)
const NAVY_MATERIAL_PROPS = {
  color: "#0A2463",        // Estithmar Navy
  emissive: "#051232",     // Deep blue glow
  emissiveIntensity: 0.2,
  metalness: 1,            // Metallic paint finish
  roughness: 0.12,         // Match gold polish
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  reflectivity: 1,
  envMapIntensity: 2
};

// Realistic Dark Metal Core
const DARK_CORE_MATERIAL = {
  color: "#020617",        // Almost black blue
  metalness: 0.9,
  roughness: 0.2,
  clearcoat: 1,
  envMapIntensity: 1.5
};

// 3D Text Label Component
const ThreeDLabel = ({ text, sub, position }: { text: string, sub: string, position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Ensure text always faces the camera for readability
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main Label */}
      <Center top position={[0, 0.25, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.25}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={3}
        >
          {text}
          <meshPhysicalMaterial {...NAVY_MATERIAL_PROPS} />
        </Text3D>
      </Center>
      
      {/* Sub Label */}
      <Center top position={[0, -0.1, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.12}
          height={0.02}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelOffset={0}
          bevelSegments={3}
        >
          {sub}
          <meshPhysicalMaterial {...NAVY_MATERIAL_PROPS} />
        </Text3D>
      </Center>
    </group>
  );
};

const MechanicalSphere = ({ scale = 1, speed = 1 }: { scale?: number, speed?: number }) => {
  const innerCageRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (innerCageRef.current) {
      innerCageRef.current.rotation.x -= delta * 0.2 * speed;
      innerCageRef.current.rotation.y -= delta * 0.3 * speed;
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x += delta * 0.1 * speed;
      outerCageRef.current.rotation.z += delta * 0.1 * speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.4 * speed;
      ringRef.current.rotation.y += delta * 0.4 * speed;
    }
  });

  return (
    <group scale={scale}>
      {/* Solid Dark Core - High Polish */}
      <mesh>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshPhysicalMaterial {...DARK_CORE_MATERIAL} />
      </mesh>

      {/* Inner Geodesic Cage (Wireframe) */}
      <mesh ref={innerCageRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshPhysicalMaterial 
          {...GOLD_MATERIAL_PROPS} 
          wireframe 
          transparent 
          opacity={0.6} // Increased opacity for better visibility
          wireframeLinewidth={2}
        />
      </mesh>

      {/* Outer Mechanical Shell (Wireframe) */}
      <mesh ref={outerCageRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial 
          {...GOLD_MATERIAL_PROPS} 
          wireframe 
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rotating Gyro Ring - High Polish */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.65, 0.02, 16, 100]} />
        <meshPhysicalMaterial {...GOLD_MATERIAL_PROPS} />
      </mesh>

      {/* Subtle Glow Pulse */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial 
          color="#FDB931" 
          speed={2} 
          distort={0.4} 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const CentralCore = ({ onReset }: { onReset?: () => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        if (onReset) onReset();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onReset) onReset();
      }}
    >
      {/* Large Central Mechanical Unit */}
      <MechanicalSphere scale={2} speed={0.5} />
      
      {/* Grand Orbital Rings - Refined for Realism */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.8, 0.015, 16, 128]} />
          <meshPhysicalMaterial {...GOLD_MATERIAL_PROPS} transparent opacity={0.5} roughness={0.2} />
        </mesh>
      </group>
      
      <group rotation={[-Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.015, 16, 128]} />
          <meshPhysicalMaterial {...GOLD_MATERIAL_PROPS} transparent opacity={0.4} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

interface OrbitingPillarProps {
  name: string;
  sub: string;
  position: [number, number, number];
  onActivate: () => void;
}

const OrbitingPillar: React.FC<OrbitingPillarProps> = ({ name, sub, position, onActivate }) => {
  return (
    <group 
      position={new THREE.Vector3(...position)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onActivate();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <MechanicalSphere scale={0.6} />

        {/* 3D Metallic Text Label - Replaces HTML */}
        <ThreeDLabel text={name} sub={sub} position={[0, 0.8, 0]} />
      </Float>

      {/* Connection Line to Center */}
      <ConnectionLine start={new THREE.Vector3(...position)} end={new THREE.Vector3(0, 0, 0)} />
    </group>
  );
};

const ConnectionLine = ({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) => {
  const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const lookAtPos = end;
  const length = start.distanceTo(end);

  return (
    <mesh position={midPoint} onUpdate={(self) => self.lookAt(lookAtPos)}>
      <cylinderGeometry args={[0.005, 0.005, length - 2.2, 8]} /> 
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
    </mesh>
  );
};

interface RotatingSceneProps {
  onPillarActivate: (index: number) => void;
  onReset: () => void;
}

const RotatingScene: React.FC<RotatingSceneProps> = ({ onPillarActivate, onReset }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05; 
    }
  });

  return (
    // Rotated 90 degrees on X to make the rotation plane vertical (XY plane) facing the camera
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]} scale={0.65}>
      <CentralCore onReset={onReset} />
      {/* Outer Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.98, 3.02, 128]} />
        <meshBasicMaterial color="#0A2463" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      
      {Pillars.map((p, i) => (
        <OrbitingPillar 
          key={i} 
          name={p.name} 
          sub={p.sub} 
          position={p.position} 
          onActivate={() => onPillarActivate(i)}
        />
      ))}
    </group>
  );
};

const VisionSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePillarInteraction = (index: number) => {
    setActivePillarIndex(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Set timer to reset to default after 1 minute (60000ms)
    timeoutRef.current = setTimeout(() => {
      setActivePillarIndex(null);
    }, 60000);
  };

  const handleReset = () => {
    setActivePillarIndex(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const activePillar = activePillarIndex !== null ? Pillars[activePillarIndex] : null;

  return (
    <section className="min-h-screen bg-white flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Text Side */}
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center order-2 md:order-1 relative z-10">
        <AnimatePresence mode="wait">
          {activePillar ? (
             <motion.div
              key={`pillar-${activePillarIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-4 block">
                Key Pillar
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-estithmar-navy mb-8 leading-tight">
                {activePillar.name} {activePillar.sub}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {activePillar.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-4 block">
                Strategic Alignment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-estithmar-navy mb-8 leading-tight">
                Qatar National Vision 2030
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Estithmar Holding operates as a catalyst for the nation's long-term goals. Our diverse portfolio is meticulously aligned to support the four pillars of Qatar's development, ensuring a balance between modernization and tradition.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {Pillars.map((p, i) => (
            <div 
              key={i} 
              className={`flex items-center space-x-3 cursor-pointer transition-opacity duration-300 ${
                activePillarIndex !== null && activePillarIndex !== i ? 'opacity-40' : 'opacity-100'
              }`}
              onMouseEnter={() => handlePillarInteraction(i)}
            >
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activePillarIndex === i ? 'bg-estithmar-navy scale-125' : 'bg-estithmar-gold'}`} />
              <span className={`font-semibold transition-colors duration-300 ${activePillarIndex === i ? 'text-estithmar-gold' : 'text-estithmar-navy'}`}>
                {p.name} Development
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Side (3D Canvas) - Transparent Background to match section bg-white */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-auto relative order-1 md:order-2 bg-white">
        
        <div className="w-full h-full absolute inset-0">
          <Canvas camera={{ position: [0, 1, 12], fov: 35 }}>
            {/* Environment Map is CRITICAL for realistic metal materials */}
            <Environment preset="city" /> 
            
            <ambientLight intensity={0.5} />
            
            {/* Adjusted lights to work WITH the environment map rather than wash it out */}
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -5, -5]} intensity={0.5} color="#4f46e5" />
            <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#ffffff" />
            
            <RotatingScene onPillarActivate={handlePillarInteraction} onReset={handleReset} />
            
            <fog attach="fog" args={['#ffffff', 10, 30]} />
          </Canvas>
        </div>
        
        {/* Overlay Label for Context */}
        <div className="absolute bottom-8 right-8 text-right pointer-events-none">
          <span className="text-estithmar-navy/5 text-6xl font-bold tracking-tighter block">2030</span>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;