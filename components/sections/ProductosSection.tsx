import { productos } from '@/lib/productos';
import Reveal from '@/components/ui/Reveal';

export default function ProductosSection() {
  return (
    <section id="productos" className="site-section products-section" aria-labelledby="products-title">
      <div className="site-container">
        <div className="section-intro">
          <Reveal as="span" className="eyebrow">Producto propio / 01—02</Reveal>
          <Reveal as="h2" variant="blur-in" id="products-title" className="display" delay={60}>También construimos<br />lo que imaginamos.</Reveal>
          <Reveal as="p" className="body-copy" delay={140}>Nuestros productos convierten experiencia en herramientas. Los diseñamos para resolver trabajo real, todos los días.</Reveal>
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
                <div className="product-window"><div className="product-window-head"><i /><i /><i /></div><div className="product-window-body">{producto.slug === 'plata-studio' ? <><span>CRM</span><span>ERP</span><span>Onboarding IA</span></> : <><span>Crear</span><span>Editar</span><span>Publicar</span></>}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
