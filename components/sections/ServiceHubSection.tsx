'use client';

import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';

import { DotPattern } from '@/components/magicui/dot-pattern';
import InteractiveModel from '@/components/three/InteractiveModel';
import { services } from '@/lib/services';

// Posición de cada card alrededor del modelo (desktop): 2 arriba, 2 abajo.
const CARD_POSITION_CLASSES = [
  'left-0 top-2 md:top-4',
  'right-0 top-2 md:top-4',
  'left-0 bottom-2 md:bottom-4',
  'right-0 bottom-2 md:bottom-4',
];

// Signo (x, y) del punto de anclaje en el modelo para cada card, en el mismo
// orden que CARD_POSITION_CLASSES: un punto distinto por esquina para que
// ninguna línea comparta tramo con otra.
const CARD_ANCHOR_SIGNS: [number, number][] = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

const DESKTOP_ANCHOR_OFFSET = { x: 92, y: 50 };

// ---- Conector punteado en ángulo recto, con degradado estático ------------
// lightRef = extremo claro (card / columna), darkRef = extremo oscuro y
// semi-transparente (modelo 3D). `bend` define si el trazo sale del extremo
// claro en horizontal o en vertical antes de doblar en ángulo recto.

type Bend = 'h-first' | 'v-first';

interface DashedConnectorProps {
  containerRef: RefObject<HTMLElement | null>;
  lightRef: RefObject<HTMLElement | null>;
  darkRef: RefObject<HTMLElement | null>;
  bend: Bend;
}

function DashedConnector({ containerRef, lightRef, darkRef, bend }: DashedConnectorProps) {
  const id = useId();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState({ ax: 0, ay: 0, bx: 0, by: 0 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !lightRef.current || !darkRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const a = lightRef.current.getBoundingClientRect();
      const b = darkRef.current.getBoundingClientRect();

      setSize({ width: containerRect.width, height: containerRect.height });
      setPoints({
        ax: a.left - containerRect.left + a.width / 2,
        ay: a.top - containerRect.top + a.height / 2,
        bx: b.left - containerRect.left + b.width / 2,
        by: b.top - containerRect.top + b.height / 2,
      });
    };

    const resizeObserver = new ResizeObserver(update);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    update();

    return () => resizeObserver.disconnect();
  }, [containerRef, lightRef, darkRef]);

  const { ax, ay, bx, by } = points;
  const d =
    bend === 'h-first' ? `M ${ax},${ay} H ${bx} V ${by}` : `M ${ax},${ay} V ${by} H ${bx}`;

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={ax} y1={ay} x2={bx} y2={by}>
          <stop offset="0%" stopColor="rgba(212,212,212,0.9)" />
          <stop offset="100%" stopColor="rgba(38,38,38,0.35)" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={1.5}
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnchorPoint({
  anchorRef,
  className,
  style,
}: {
  anchorRef: RefObject<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      ref={anchorRef}
      aria-hidden="true"
      className={`pointer-events-none absolute h-px w-px ${className ?? ''}`}
      style={style}
    />
  );
}

// Tooltip que sigue al cursor, visible solo mientras el mouse está dentro
// de esta sección (no aplica a touch, donde no existe cursor).
function CursorTooltip({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 30, stiffness: 400, mass: 0.5 });
  const y = useSpring(rawY, { damping: 30, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updatePosition = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left + 18);
      rawY.set(e.clientY - rect.top + 18);
    };
    const handleEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      updatePosition(e);
      setVisible(true);
    };
    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      updatePosition(e);
    };
    const handleLeave = () => setVisible(false);

    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, [containerRef, rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-20 hidden select-none whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-black md:block"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      Nuestros servicios
    </motion.div>
  );
}

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
}

function ServiceCard({ slug, title, description }: ServiceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setOpen((prev) => !prev);
      }}
      className="w-full min-w-0 cursor-pointer rounded-xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:border-white/30 md:w-[220px]"
    >
      <h3 className="font-display text-[14px] font-medium text-white">{title}</h3>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-[12px] leading-relaxed text-white/60">{description}</p>
        <Link
          href={`/servicios/${slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-white"
        >
          Ir al servicio
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  );
}

export default function ServiceHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Un punto de anclaje distinto por esquina del modelo (desktop).
  const cornerAnchorRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Refs estables (uno por servicio) para medir la posición real de cada card.
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Anclas para las 2 líneas de mobile: una a cada lado del modelo, y una
  // encima de cada columna de cards.
  const mobileModelAnchorLeft = useRef<HTMLDivElement>(null);
  const mobileModelAnchorRight = useRef<HTMLDivElement>(null);
  const mobileColLeftRef = useRef<HTMLDivElement>(null);
  const mobileColRightRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-black py-[72px]"
      data-navbar-theme="dark"
    >
      <DotPattern
        glow
        className="text-white/70 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <CursorTooltip containerRef={sectionRef} />

      <div className="relative mx-auto max-w-[1280px] px-7">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
            Un ecosistema, cuatro servicios
          </span>
          <h2 className="font-display text-[1.75rem] font-medium text-white">
            Todo conectado a un mismo lugar
          </h2>
        </div>

        <div ref={wrapRef} className="relative mx-auto max-w-[920px]">
          {/* Stage: modelo 3D + cards (desktop) */}
          <div ref={stageRef} className="relative h-[190px] md:h-[500px]">
            <div className="absolute inset-0">
              <InteractiveModel />
            </div>

            {/* Anclas de esquina (desktop) */}
            {CARD_ANCHOR_SIGNS.map(([sx, sy], index) => (
              <AnchorPoint
                key={services[index].slug}
                anchorRef={cornerAnchorRefs[index]}
                className="left-1/2 top-1/2 hidden md:block"
                style={{
                  transform: `translate(${sx * DESKTOP_ANCHOR_OFFSET.x}px, ${sy * DESKTOP_ANCHOR_OFFSET.y}px)`,
                }}
              />
            ))}

            {/* Anclas del modelo para mobile (una a cada lado, cerca de la base) */}
            <AnchorPoint
              anchorRef={mobileModelAnchorLeft}
              className="left-1/2 md:hidden"
              style={{ transform: 'translate(-22px, 0)', top: '132px' }}
            />
            <AnchorPoint
              anchorRef={mobileModelAnchorRight}
              className="left-1/2 md:hidden"
              style={{ transform: 'translate(22px, 0)', top: '132px' }}
            />

            {/* Líneas: solo desktop, para no ensuciar el layout apilado de mobile */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {services.map((service, index) => (
                <DashedConnector
                  key={service.slug}
                  containerRef={stageRef}
                  lightRef={cardRefs[index]}
                  darkRef={cornerAnchorRefs[index]}
                  bend="h-first"
                />
              ))}
            </div>

            {services.map((service, index) => (
              <div
                key={service.slug}
                ref={cardRefs[index]}
                className={`absolute hidden md:block ${CARD_POSITION_CLASSES[index]}`}
              >
                <ServiceCard
                  slug={service.slug}
                  title={service.cardTitle}
                  description={service.cardDescription}
                />
              </div>
            ))}
          </div>

          {/* Líneas hacia cada columna: solo mobile */}
          <div className="pointer-events-none absolute inset-0 md:hidden">
            <DashedConnector
              containerRef={wrapRef}
              lightRef={mobileColLeftRef}
              darkRef={mobileModelAnchorLeft}
              bend="v-first"
            />
            <DashedConnector
              containerRef={wrapRef}
              lightRef={mobileColRightRef}
              darkRef={mobileModelAnchorRight}
              bend="v-first"
            />
          </div>

          {/* Mobile: cards apiladas debajo del modelo */}
          <div className="relative mt-3 grid grid-cols-2 gap-3 md:hidden">
            <AnchorPoint
              anchorRef={mobileColLeftRef}
              className="left-1/4 -top-1 -translate-x-1/2"
            />
            <AnchorPoint
              anchorRef={mobileColRightRef}
              className="left-3/4 -top-1 -translate-x-1/2"
            />
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.cardTitle}
                description={service.cardDescription}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
