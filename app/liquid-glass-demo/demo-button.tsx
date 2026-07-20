'use client';

import LiquidGlassIcon from '@/components/ui/liquid-glass-icon';

export default function DemoButton() {
  return (
    <LiquidGlassIcon
      width={220}
      height={212.5}
      onClick={() => alert('Liquid glass button clicked')}
    >
      <span className="font-display font-medium text-[15px] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
        Click me
      </span>
    </LiquidGlassIcon>
  );
}
