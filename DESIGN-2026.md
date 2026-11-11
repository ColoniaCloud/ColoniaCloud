# Colonia Cloud — diseño y oferta vigente

**Actualizado el 11 de noviembre de 2026.** Este documento reemplaza las decisiones de interfaz y catálogo de `01-brandbook.md` a `04-productos-servicios.md` cuando haya diferencias.

Acá van la dirección y la oferta. La implementación —tokens, tipografía, grilla, anatomía de componentes y el sistema de animaciones— está en [`SISTEMA-VISUAL-2026.md`](SISTEMA-VISUAL-2026.md).

## Dirección visual

Vigente desde el 11 de noviembre de 2026. Reemplaza a la dirección de octubre (fondo celeste, Clash Display + DM Sans, globo en el hero). `SISTEMA-VISUAL-2026.md` describe el sistema anterior y queda como referencia histórica; la fuente de verdad de tokens y componentes es `app/globals.css`.

### Paleta: fría, con un único acento cálido

La referencia es el río al anochecer: azules de noche y bruma, y la franja naranja del horizonte como único color cálido.

| Token | Hex | Uso |
|---|---|---|
| `--cc-ink` | `#091828` | Noche. Fondos oscuros (hero, casos, footer) y texto principal. |
| `--cc-ink-2` | `#12283E` | Superficies sobre fondo oscuro. |
| `--cc-blue` | `#1E5F8C` | Río. Foco de formularios y detalles fríos. |
| `--cc-ice` | `#DEEAF3` | Hielo. Secciones tintadas y etiquetas de precio. |
| `--cc-bg` | `#F3F6F9` | Bruma. Fondo general. |
| `--cc-surface` | `#FFFFFF` | Tarjetas y secciones alternas. |
| `--cc-line` | `#D3DEE8` | Bordes y separadores. |
| `--cc-text-body` | `#425568` | Texto de lectura (7,4:1 sobre bruma). |
| `--cc-accent` | `#F28C38` | Acento cálido. Relleno de botones primarios, siempre con texto noche encima (7:1). |
| `--cc-warm` | `#A64A0D` | El mismo acento para texto y enlaces sobre fondos claros (5,7:1). |

Reglas: el acento cálido se reserva para la acción principal, las etiquetas y los detalles; nunca como fondo de sección. `--cc-accent` no se usa como color de texto sobre claro: para eso está `--cc-warm`. El logo es monocromo: negro sobre claro, blanco (invertido) sobre oscuro.

### Tipografía

- **Bricolage Grotesque** (500) en titulares. Una grotesca con carácter que acompaña al logo en Syne sin competirle.
- **Geist** en lectura, navegación y controles. Cuerpo de 16 a 18px; nada por debajo de 13px.
- **Geist Mono** en etiquetas, numeración, precios auxiliares y coordenadas.

El H1 es el tamaño más grande de cada página; los H2 bajan un escalón (`.h-xl` → `.h-lg`).

### Movimiento

- Duraciones de interfaz: 100, 150, 200 o 300 ms, con ease-out. Solo se animan `transform`, `opacity` y `clip-path`.
- Parallax: el componente `ScrollScene` escribe el avance del scroll en la variable CSS `--p` y las capas la leen con `calc()`. En el hero de la home el escenario queda fijado: la foto se encoge hasta ser una ventana, el titular sube y el faro emerge en primer plano. El collage "Hecho en Colonia" mueve tres fotos a tres velocidades.
- El fondo del hero es un video de 8 s en bucle (`public/hero-loop.mp4`) renderizado con HyperFrames desde `motion/hero-loop/`. Solo se carga en escritorio y se puede pausar.
- Con `prefers-reduced-motion` no hay parallax, ni video, ni entradas animadas.

### Fotografía

Fotos de Colonia del Sacramento y de trabajo, en tonos fríos. Las de Unsplash están en `public/unsplash/` con sus créditos en `public/unsplash/CREDITOS.md`. Los casos muestran trabajo verificable; no se usan fotos de stock para representar proyectos de clientes.

### Voz

De vos, directa y sin jerga. El llamado a la acción principal es siempre el mismo: **"Hablemos por WhatsApp"**. Los precios confirmados se muestran; lo que no está confirmado no se inventa.

## Servicios

| Servicio | Oferta |
|---|---|
| Diseño web | Portón: sitio web, USD 50/mes. Mercado: web + e-commerce, USD 80/mes. Proyecto a medida por presupuesto. Ambos planes incluyen créditos de IA para casos aplicables. |
| Marketing digital | Faro: Google Ads + contenido, USD 70/mes. Horizonte: Google Ads + Meta Ads + contenido, USD 150/mes. Opción a medida por presupuesto. Incluye investigación de mercado, competencia y oportunidades, además de recursos gráficos. La inversión publicitaria en las plataformas se paga aparte. |
| Infraestructura cloud | Cloud storage, bases de datos relacionales y no relacionales, VPS y soporte para Azure, AWS, Google Cloud y Oracle Cloud. Presupuesto según alcance. |
| IA y automatizaciones | Automatización de procesos con o sin IA, infraestructura local de IA orientada a la seguridad de datos, y aplicaciones para atención al cliente y soporte. Presupuesto según alcance. |

Los nombres de planes están inspirados en la función que cumplen dentro de la historia y el paisaje de Colonia: **Portón** abre la presencia digital, **Mercado** habilita la venta, **Faro** mejora la visibilidad y **Horizonte** amplía el alcance.

## Productos propios

- **Plata Studio:** CRM/ERP con onboarding de IA que configura una arquitectura personalizada para cada nivel sin setup dedicado.
- **MarketDeck:** gestión multiplataforma de redes sociales con IA y edición de contenido integrada.

## Fuentes de datos y páginas

- `lib/services.ts` alimenta la home, `/servicios`, las cuatro fichas y el footer.
- `lib/productos.ts` alimenta la sección de productos.
- Los slugs anteriores de servicios redirigen hacia el nuevo catálogo.

## Información a precisar antes de prometer límites concretos

- Cantidad y alcance exacto de créditos de IA en los planes web.
- Volumen de contenido, recursos gráficos y frecuencia de entregas en marketing.
- Condiciones de permanencia, hosting y soporte de los planes mensuales web.
- Alcance y tarifas de infraestructura cloud e IA por proyecto.

Por ahora el sitio presenta los importes confirmados y no inventa cuotas ni límites de uso.
