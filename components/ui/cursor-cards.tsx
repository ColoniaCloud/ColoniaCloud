'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

interface CursorPosition {
  mouseX: number;
  mouseY: number;
  isWithinRange: boolean;
}

const CursorPositionContext = createContext<CursorPosition>({
  mouseX: 0,
  mouseY: 0,
  isWithinRange: false,
});

interface CursorCardsContainerProps {
  children: React.ReactNode;
  className?: string;
  proximityRange?: number;
}

export function CursorCardsContainer({
  children,
  className,
  proximityRange = 400,
}: CursorCardsContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mouseState, setMouseState] = useState<CursorPosition>({
    mouseX: 0,
    mouseY: 0,
    isWithinRange: false,
  });

  const handlePointerMovement = useCallback(
    (event: PointerEvent) => {
      if (!wrapperRef.current) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      const isInProximity =
        clientX >= bounds.left - proximityRange &&
        clientX <= bounds.right + proximityRange &&
        clientY >= bounds.top - proximityRange &&
        clientY <= bounds.bottom + proximityRange;

      setMouseState({ mouseX: clientX, mouseY: clientY, isWithinRange: isInProximity });
    },
    [proximityRange]
  );

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMovement);
    return () => document.removeEventListener('pointermove', handlePointerMovement);
  }, [handlePointerMovement]);

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <CursorPositionContext.Provider value={mouseState}>
        {children}
      </CursorPositionContext.Provider>
    </div>
  );
}

interface CursorCardProps {
  children?: React.ReactNode;
  className?: string;
  illuminationRadius?: number;
  illuminationColor?: string;
  illuminationOpacity?: number;
  primaryHue?: string;
  secondaryHue?: string;
  borderColor?: string;
}

export function CursorCard({
  children,
  className,
  illuminationRadius = 200,
  illuminationColor = '#BAE6FD66',
  illuminationOpacity = 0.7,
  primaryHue = '#E0F2FE',
  secondaryHue = '#7DD3FC',
  borderColor = 'rgba(0,0,0,0.1)',
}: CursorCardProps) {
  const { mouseX: globalMouseX, mouseY: globalMouseY, isWithinRange } =
    useContext(CursorPositionContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const localMouseX = useMotionValue(-illuminationRadius);
  const localMouseY = useMotionValue(-illuminationRadius);
  const [isCardActive, setIsCardActive] = useState(false);

  useEffect(() => {
    if (!elementRef.current || !isWithinRange) {
      setIsCardActive(false);
      localMouseX.set(-illuminationRadius);
      localMouseY.set(-illuminationRadius);
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const extendedProximity = 100;

    const isNearCard =
      globalMouseX >= rect.left - extendedProximity &&
      globalMouseX <= rect.right + extendedProximity &&
      globalMouseY >= rect.top - extendedProximity &&
      globalMouseY <= rect.bottom + extendedProximity;

    setIsCardActive(isNearCard);

    if (isNearCard) {
      localMouseX.set(globalMouseX - rect.left);
      localMouseY.set(globalMouseY - rect.top);
    } else {
      localMouseX.set(-illuminationRadius);
      localMouseY.set(-illuminationRadius);
    }
  }, [globalMouseX, globalMouseY, isWithinRange, illuminationRadius, localMouseX, localMouseY]);

  const gradientBackground = useMotionTemplate`
    radial-gradient(${illuminationRadius}px circle at ${localMouseX}px ${localMouseY}px,
    ${primaryHue},
    ${secondaryHue},
    ${borderColor} 100%
    )
  `;

  const illuminationBackground = useMotionTemplate`
    radial-gradient(${illuminationRadius}px circle at ${localMouseX}px ${localMouseY}px,
    ${illuminationColor}, transparent 100%)
  `;

  return (
    <div ref={elementRef} className={cn('group relative rounded-[inherit]', className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: gradientBackground }}
      />
      <div className="absolute inset-px rounded-[inherit] bg-cc-bg" />
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{ background: illuminationBackground, opacity: isCardActive ? illuminationOpacity : 0 }}
      />
      <div className="relative rounded-[inherit]">{children}</div>
    </div>
  );
}
