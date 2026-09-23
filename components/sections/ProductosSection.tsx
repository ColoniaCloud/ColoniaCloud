import { productos } from '@/lib/productos';

export default function ProductosSection() {
  return (
    <section id="productos" className="site-section products-section" aria-labelledby="products-title">
      <div className="site-container">
        <div className="section-intro">
          <span className="eyebrow">Producto propio / 01—02</span>
          <h2 id="products-title" className="display">También construimos<br />lo que imaginamos.</h2>
          <p className="body-copy">Nuestros productos convierten experiencia en herramientas. Los diseñamos para resolver trabajo real, todos los días.</p>
        </div>
        <div className="product-grid">
          {productos.map((producto) => (
            <article className="product-card" key={producto.slug}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
