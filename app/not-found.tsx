import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/services';

// Next agrega solo el <meta name="robots" content="noindex"> y responde 404.
// El título de la pestaña es el del layout: not-found no puede exportar
// metadata propia.
export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-cc-bg pt-[110px] pb-[64px]">
      <div className="max-w-[520px] mx-auto px-7 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-cc-accent-light flex items-center justify-center mb-2">
          <Compass size={32} className="text-cc-accent" aria-hidden="true" />
        </div>

        <h1 className="font-display font-medium text-[1.75rem] text-cc-text">
          Esta página no existe
        </h1>

        <p className="text-[16px] text-cc-text-body leading-relaxed">
          Puede que el enlace esté mal escrito o que la página se haya movido.
          Lo que buscás probablemente esté en alguno de estos lugares:
        </p>

        <nav aria-label="Servicios" className="flex flex-wrap justify-center gap-2">
          {services.map(({ name, slug }) => (
            <Link
              key={slug}
              href={`/servicios/${slug}`}
              className="text-[13px] text-cc-text-body border border-white/10 rounded-full px-3 py-1 hover:border-cc-accent hover:text-cc-accent transition-colors"
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Button variant="primary" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contacto">Contacto</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
