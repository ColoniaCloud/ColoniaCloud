import { GoogleIcon, MetaIcon, OracleIcon, RedhatIcon } from '@/components/ui/brand-icons';

const partners = [
  { nombre: 'Red Hat', Icono: RedhatIcon },
  { nombre: 'Oracle', Icono: OracleIcon },
  { nombre: 'Google', Icono: GoogleIcon },
  { nombre: 'Meta', Icono: MetaIcon },
];

export default function TrustBarSection() {
  return (
    <section className="client-strip on-ink" aria-label="Partners">
      <div className="site-container client-strip-inner">
        <p>Partners:</p>
        <ul className="client-logos">
          {partners.map(({ nombre, Icono }) => (
            <li key={nombre} title={nombre}>
              <Icono size={34} aria-label={nombre} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
