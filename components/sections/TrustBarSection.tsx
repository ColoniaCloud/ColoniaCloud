import { casos } from '@/lib/casos';

// Altura de cada logo según su proporción, para que uno apaisado y uno
// compacto pesen lo mismo a la vista (área visual constante).
const logoHeight = (ancho: number, alto: number) => Math.round(62 / Math.sqrt(ancho / alto));

export default function TrustBarSection() {
  return (
    <section className="client-strip on-ink" aria-label="Clientes">
      <div className="site-container client-strip-inner">
        <p>Marcas que ya trabajan con nosotros</p>
        <ul className="client-logos">
          {casos.map(({ cliente, logo }) => (
            <li key={cliente}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={cliente} width={logo.ancho} height={logo.alto} loading="lazy" style={{ height: logoHeight(logo.ancho, logo.alto) }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
