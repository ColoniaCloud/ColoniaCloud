# Colonia Cloud — diseño y oferta vigente

**Septiembre de 2026.** Este documento reemplaza las decisiones de interfaz y catálogo de `01-brandbook.md` a `04-productos-servicios.md` cuando haya diferencias.

Acá van la dirección y la oferta. La implementación —tokens, tipografía, grilla, anatomía de componentes y el sistema de animaciones— está en [`SISTEMA-VISUAL-2026.md`](SISTEMA-VISUAL-2026.md).

## Dirección visual

- Interfaz oscura con una atmósfera de atardecer: azul profundo, carbón y luz cálida.
- Tipografía Clash Display para titulares y DM Sans para lectura y controles.
- Composición editorial con fotografías reales de Colonia del Sacramento.
- El hero usa gradientes CSS y `public/atardecer colonia.webp`; no carga video ni WebGL.
- Los casos muestran trabajo verificable. Los testimonios de origen pendiente de confirmar no aparecen en la home.

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
