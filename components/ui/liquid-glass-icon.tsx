'use client';

import {
  useId,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

// Original artwork: public/brand/ico-glass.svg, viewBox 0 0 352 340 (two facing half-moons).
const VIEWBOX_WIDTH = 352;
const VIEWBOX_HEIGHT = 340;

// The two paths straight from ico-glass.svg, used to draw the border strokes
// inside a <svg viewBox="0 0 352 340"> that stretches to the box's own size.
const LEFT_CRESCENT_PATH_RAW =
  'M169.455 339.179C124.513 339.179 81.411 321.311 49.632 289.507C17.8532 257.703 0 214.567 0 169.589C0 124.611 17.8532 81.476 49.632 49.672C81.411 17.8674 124.513 0 169.455 0V339.179Z';
const RIGHT_CRESCENT_PATH_RAW =
  'M352 339.179C307.058 339.179 263.956 321.311 232.177 289.507C200.398 257.703 182.545 214.567 182.545 169.589C182.545 124.611 200.398 81.476 232.177 49.672C263.956 17.8674 307.058 0 352 0V339.179Z';

// Same two paths, coordinates divided by 352 (x) / 340 (y) so they can drive an
// SVG <clipPath clipPathUnits="objectBoundingBox">, which stretches to fit
// whatever box size the component is rendered at.
const LEFT_CRESCENT_PATH_NORM =
  'M0.48140625 0.99758529 C0.35373011 0.99758529 0.23128125 0.94503235 0.141 0.85149118 C0.05071932 0.75795 0 0.63107941 0 0.49879118 C0 0.36650294 0.05071932 0.23963529 0.141 0.14609412 C0.23128125 0.05255118 0.35373011 0 0.48140625 0 V0.99758529 Z';
const RIGHT_CRESCENT_PATH_NORM =
  'M1 0.99758529 C0.87232386 0.99758529 0.749875 0.94503235 0.65959375 0.85149118 C0.5693125 0.75795 0.51859375 0.63107941 0.51859375 0.49879118 C0.51859375 0.36650294 0.5693125 0.23963529 0.65959375 0.14609412 C0.749875 0.05255118 0.87232386 0 1 0 V0.99758529 Z';

// Resting position of the specular highlight (in viewBox units) when the
// pointer isn't over the icon — same spot a fixed studio light would hit.
const REST_CX = VIEWBOX_WIDTH * 0.5;
const REST_CY = VIEWBOX_HEIGHT * 0.32;
const HIGHLIGHT_RADIUS = VIEWBOX_WIDTH * 0.2;

// Displacement map for the lens/refraction distortion: a radial gradient from
// gray (128,128 = no displacement) to a slightly-shifted edge color. Read
// through xChannelSelector="R" / yChannelSelector="G" by feDisplacementMap,
// this pushes content outward more strongly near the rim than at the center —
// the same "calm center, warped edge" look a real convex lens produces.
const DISPLACEMENT_MAP_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
  '<defs><radialGradient id="g" cx="50%" cy="50%" r="65%">' +
  '<stop offset="0%" stop-color="#808080"/>' +
  '<stop offset="100%" stop-color="#b46ecb"/>' +
  '</radialGradient></defs>' +
  '<rect width="300" height="300" fill="url(#g)"/></svg>';
const DISPLACEMENT_MAP_URI = `data:image/svg+xml,${encodeURIComponent(DISPLACEMENT_MAP_SVG)}`;

export interface LiquidGlassIconProps {
  /** Rendered width in px. Defaults to the artwork's natural width (352). */
  width?: number;
  /** Rendered height in px. Defaults to `width` scaled by the artwork's aspect ratio. */
  height?: number;
  className?: string;
  style?: CSSProperties;
  /** Optional content layered on top of the glass (a glyph, label, etc). */
  children?: ReactNode;
  onClick?: () => void;
  /** Backdrop blur radius in px — the frosting level. */
  blurAmount?: number;
  /** Backdrop saturation, in %. */
  saturation?: number;
  /** Set true when placing the icon over a very light/white background. */
  overLight?: boolean;
  /** Lens/refraction distortion strength (feDisplacementMap scale, SVG user units). */
  distortionScale?: number;
}

/**
 * A "liquid glass" icon clipped to the two-crescent shape of public/brand/ico-glass.svg.
 *
 * This deliberately does NOT use `liquid-glass-react`: that library drives its
 * refraction via a multi-pass `filter: url(#svgFilter)` (feImage + three
 * chained feDisplacementMap + feComposite for chromatic aberration), and that
 * specific chain breaks once any ancestor also has `clip-path` applied — the
 * shape silently stops clipping (or paints solid black), even though computed
 * styles look correct.
 *
 * A simpler, hand-rolled `filter: url()` with a single `feImage` +
 * `feDisplacementMap` does NOT hit that bug: confirmed with an isolated A/B
 * test where the same filter survives being combined with both a `clip-path`
 * ancestor and a `mask-image` ancestor. So the fill layer below uses exactly
 * that — backdrop-filter (blur+saturate) plus one feDisplacementMap pass for
 * the lens-bulge distortion, masked to the crescent shape via `mask-image`
 * (SVG `<mask>`, not `<clipPath>` — same objectBoundingBox geometry either
 * way, but `mask-image` is what was validated for this specific combination).
 *
 * Two distinct layers, kept deliberately separate:
 *  - Fill: backdrop-filter blur+saturate + the distortion filter — a stable
 *    frosted, refracted look that never changes color/brightness as the
 *    pointer moves.
 *  - Border: rim light + chromatic fringe (constant) plus a specular
 *    highlight whose radial gradient is stroked along the path outline only,
 *    and whose center is moved to the pointer position on every move.
 */
export default function LiquidGlassIcon({
  width = VIEWBOX_WIDTH,
  height,
  className,
  style,
  children,
  onClick,
  blurAmount = 14,
  saturation = 180,
  overLight = false,
  distortionScale = 16,
}: LiquidGlassIconProps) {
  const reactId = useId().replace(/:/g, '');
  const clipId = `liquid-glass-icon-clip-${reactId}`;
  const maskId = `liquid-glass-icon-mask-${reactId}`;
  const distortId = `liquid-glass-icon-distort-${reactId}`;
  const highlightId = `liquid-glass-icon-highlight-${reactId}`;
  const resolvedHeight = height ?? Math.round((width * VIEWBOX_HEIGHT) / VIEWBOX_WIDTH);
  const rootRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<SVGRadialGradientElement>(null);

  const movePointer = (clientX: number, clientY: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || !highlightRef.current) return;
    const cx = ((clientX - rect.left) / rect.width) * VIEWBOX_WIDTH;
    const cy = ((clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT;
    highlightRef.current.setAttribute('cx', String(cx));
    highlightRef.current.setAttribute('cy', String(cy));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    movePointer(event.clientX, event.clientY);
  };

  const resetPointer = () => {
    highlightRef.current?.setAttribute('cx', String(REST_CX));
    highlightRef.current?.setAttribute('cy', String(REST_CY));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ position: 'relative', width, height: resolvedHeight, ...style }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* Shape definition only — not rendered visually itself. */}
      <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={LEFT_CRESCENT_PATH_NORM} />
            <path d={RIGHT_CRESCENT_PATH_NORM} />
          </clipPath>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            <path d={LEFT_CRESCENT_PATH_NORM} fill="white" />
            <path d={RIGHT_CRESCENT_PATH_NORM} fill="white" />
          </mask>
          {/* La filter region default de SVG (-10%,-10%,120%,120%) recorta en
              un rectángulo cualquier píxel que feDisplacementMap empuje más
              allá de ese margen — visible como bordes rectos dentro del mask
              orgánico. Se agranda a -50%/-50%/200%/200% (filterUnits del
              propio filtro Y del feImage que alimenta el mapa) para que la
              distorsión tenga lugar de sobra antes de llegar a cualquier
              borde real, sin cortes. */}
          <filter
            id={distortId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={DISPLACEMENT_MAP_URI}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              result="LG_DISPLACEMENT_MAP"
              preserveAspectRatio="none"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="LG_DISPLACEMENT_MAP"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* CAPA 1 — Relleno: backdrop-filter (blur+saturate) más un pase de
          feDisplacementMap para la distorsión de lente, sin tinte de color ni
          brillo que siga el mouse. Recortado a la forma via mask-image. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            filter: `url(#${distortId})`,
            backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
            WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
            background: overLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.12)',
          }}
        />
      </div>

      {/* CAPA 2 — Borde: rim light + aberración cromática (constantes) y el
          brillo especular (gradiente radial en el `stroke`, no en el fill),
          cuyo centro sigue al puntero. Todo trazo, nada de relleno propio. */}
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            ref={highlightRef}
            id={highlightId}
            gradientUnits="userSpaceOnUse"
            cx={REST_CX}
            cy={REST_CY}
            r={HIGHLIGHT_RADIUS}
          >
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Rim light tenue, constante. */}
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={2}>
          <path d={LEFT_CRESCENT_PATH_RAW} />
          <path d={RIGHT_CRESCENT_PATH_RAW} />
        </g>

        {/* Franja cromática sutil, constante. */}
        <g fill="none" strokeWidth={2} style={{ mixBlendMode: 'screen' }}>
          <path d={LEFT_CRESCENT_PATH_RAW} stroke="rgba(120,210,255,0.3)" transform="translate(-0.6, 0)" />
          <path d={RIGHT_CRESCENT_PATH_RAW} stroke="rgba(120,210,255,0.3)" transform="translate(-0.6, 0)" />
          <path d={LEFT_CRESCENT_PATH_RAW} stroke="rgba(255,150,200,0.3)" transform="translate(0.6, 0)" />
          <path d={RIGHT_CRESCENT_PATH_RAW} stroke="rgba(255,150,200,0.3)" transform="translate(0.6, 0)" />
        </g>

        {/* Brillo especular: mismo trazo, coloreado con el gradiente que sigue al mouse. */}
        <g fill="none" stroke={`url(#${highlightId})`} strokeWidth={4}>
          <path d={LEFT_CRESCENT_PATH_RAW} />
          <path d={RIGHT_CRESCENT_PATH_RAW} />
        </g>
      </svg>

      {children ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
