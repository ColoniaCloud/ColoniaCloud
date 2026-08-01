'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const dots = Array.from(
    {
      length:
        Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height),
    },
    (_, i) => {
      const cols = Math.ceil(dimensions.width / width);
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: col * width + cx,
        y: row * height + cy,
      };
    },
  );

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>

      {!glow && <rect width="100%" height="100%" fill={`url(#${id})`} />}

      {glow && (
        <svg x="0" y="0" className="overflow-visible">
          {dots.map((dot, index) => (
            <motion.circle
              key={`${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r={cr}
              fill={`url(#${id}-glow)`}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2 + ((index * 37) % 300) / 100,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: ((index * 53) % 500) / 100,
              }}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
