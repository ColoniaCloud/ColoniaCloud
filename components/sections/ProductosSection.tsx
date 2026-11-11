import { productos } from '@/lib/productos';
import Reveal from '@/components/ui/Reveal';

const windowTabs: Record<string, string[]> = {
  'plata-studio': ['CRM', 'ERP', 'Onboarding IA'],
  marketdeck: ['Crear', 'Editar', 'Publicar'],
};

export default function ProductosSection() {
  return (
    <section id="productos" className="site-section" aria-labelledby="products-title">
      <div className="site-container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">Producto propio</Reveal>
          <Reveal as="h2" id="products-title" className="display h-lg">También construimos nuestro propio software.</Reveal>
          <Reveal as="p" className="body-copy">Lo que aprendemos con cada cliente termina en herramientas que usamos y ofrecemos todos los días.</Reveal>
        </div>
        <div className="product-grid stagger">
          {productos.map((producto) => (
            <Reveal as="article" className="product-card" key={producto.slug}>
              <div className="product-card-copy">
                <span className="eyebrow">{producto.label}</span>
                <h3>{producto.nombre}</h3>
                <p className="product-card-claim">{producto.claim}</p>
                <p className="product-card-description">{producto.descripcion}</p>
                <ul>{producto.capacidades.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="product-visual" aria-hidden="true">
                <div className="product-window">
                  <div className="product-window-head"><i /><i /><i /></div>
                  <div className="product-window-body">{(windowTabs[producto.slug] ?? []).map((tab) => <span key={tab}>{tab}</span>)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
