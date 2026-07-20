import type { Metadata } from 'next';
import LiquidGlassIcon from '@/components/ui/liquid-glass-icon';
import DemoButton from './demo-button';

export const metadata: Metadata = {
  title: 'Liquid Glass Demo — Colonia Cloud',
  robots: { index: false, follow: false },
};

export default function LiquidGlassDemoPage() {
  return (
    <main className="bg-black">
      {/* Sección 1 — sobre video, misma escena que el Hero real */}
      <section className="relative w-full overflow-hidden py-[96px] flex flex-col items-center gap-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/drone.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45 z-10" aria-hidden="true" />

        <div className="relative z-20 text-center px-6">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide mb-4">
            Liquid Glass
          </span>
          <h1 className="font-display font-semibold text-[2rem] md:text-[2.6rem] text-white max-w-[640px] mx-auto leading-[1.2]">
            Refracción real, recortada a la forma exacta del ícono
          </h1>
          <p className="text-white/70 mt-3 max-w-[480px] mx-auto text-[15px]">
            Mismo path de <code className="text-white/90">ico-glass.svg</code> — ahora con
            vidrio líquido en vez de un relleno blanco plano.
          </p>
        </div>

        <div className="relative z-20">
          <LiquidGlassIcon width={280} height={270} />
        </div>
      </section>

      {/* Sección 2 — sobre gradiente saturado, para ver claramente la distorsión */}
      <section
        className="relative w-full py-[96px] flex flex-col items-center gap-14"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, #ff5f6d 0%, transparent 45%),' +
            'radial-gradient(circle at 80% 30%, #36d1dc 0%, transparent 45%),' +
            'radial-gradient(circle at 50% 80%, #f9d423 0%, transparent 50%),' +
            'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        }}
      >
        <div className="text-center px-6">
          <h2 className="font-display font-medium text-[1.5rem] text-white mb-2">
            Distintos tamaños, mismo shape
          </h2>
          <p className="text-white/60 text-[14px] max-w-[440px] mx-auto">
            Pasá el mouse por encima para ver el brillo especular seguir el puntero.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16">
          <LiquidGlassIcon width={352} height={340} />
          <LiquidGlassIcon width={176} height={170} />
          <LiquidGlassIcon width={96} height={92.7} blurAmount={10} />
        </div>

        {/* Uso como botón, con contenido encima del vidrio */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          <DemoButton />
        </div>
      </section>

      {/* Sección 3 — sobre fondo claro, con overLight activado */}
      <section className="w-full py-[96px] flex flex-col items-center gap-8 bg-[#EDEDED]">
        <div className="text-center px-6">
          <h2 className="font-display font-medium text-[1.5rem] text-black mb-2">
            Modo overLight, para fondos claros
          </h2>
        </div>
        <LiquidGlassIcon width={220} height={212.5} overLight />
      </section>
    </main>
  );
}
