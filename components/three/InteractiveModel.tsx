'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { damp } from 'maath/easing';
import * as THREE from 'three';

const MODEL_URL = '/3D/ccgris3d.glb';

const MAX_PITCH = 0.55;
const DRAG_SENSITIVITY = 0.008;
const DAMPING_TIME = 0.25;
const MODEL_TARGET_SIZE = 1.3; // 50% más chico que el tamaño anterior (2.6)
const MOBILE_SIZE_MULTIPLIER = 2; // el doble de grande en mobile
const MOBILE_BREAKPOINT_PX = 768; // coincide con el breakpoint `md` de Tailwind
// Rotación automática lenta en Y (sentido horario visto desde arriba). Se
// pausa mientras el usuario arrastra y retoma desde donde quedó.
const AUTO_ROTATE_SPEED = THREE.MathUtils.degToRad(5); // rad/s
// Vista 3/4 en perspectiva por defecto (estilo "Claude Design"): rotación en
// Y para no mostrar el objeto de canto, más una leve inclinación en X para
// revelar el volumen/espesor en vez de la silueta plana.
const INITIAL_ROTATION_Y = THREE.MathUtils.degToRad(35);
const INITIAL_ROTATION_X = THREE.MathUtils.degToRad(22); // -18° + 40°

type RotationTarget = { x: number; y: number };
type DragState = { dragging: boolean; lastX: number; lastY: number };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function Model({
  targetRotation,
  dragState,
  isMobile,
}: {
  targetRotation: React.MutableRefObject<RotationTarget>;
  dragState: React.MutableRefObject<DragState>;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  const normalizedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    clone.position.sub(center);
    return clone;
  }, [scene]);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(normalizedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = isMobile ? MODEL_TARGET_SIZE * MOBILE_SIZE_MULTIPLIER : MODEL_TARGET_SIZE;
    return targetSize / maxDim;
  }, [normalizedScene, isMobile]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!dragState.current.dragging) {
      targetRotation.current.y -= AUTO_ROTATE_SPEED * delta;
    }
    damp(groupRef.current.rotation, 'x', targetRotation.current.x, DAMPING_TIME, delta);
    damp(groupRef.current.rotation, 'y', targetRotation.current.y, DAMPING_TIME, delta);
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      rotation={[targetRotation.current.x, targetRotation.current.y, 0]}
    >
      <primitive object={normalizedScene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function InteractiveModel() {
  const targetRotation = useRef<RotationTarget>({ x: INITIAL_ROTATION_X, y: INITIAL_ROTATION_Y });
  const dragState = useRef<DragState>({ dragging: false, lastX: 0, lastY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;

    targetRotation.current = {
      x: clamp(targetRotation.current.x + dy * DRAG_SENSITIVITY, -MAX_PITCH, MAX_PITCH),
      y: targetRotation.current.y + dx * DRAG_SENSITIVITY,
    };
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current.dragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragState.current.dragging = false;
    setIsDragging(false);
  };

  return (
    <div
      className="h-full w-full touch-none select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 5.5], fov: 35 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <directionalLight position={[-4, -2, -3]} intensity={0.35} />
        <Suspense fallback={null}>
          <Model targetRotation={targetRotation} dragState={dragState} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
