# Colonia Cloud — Sistema visual 2026

**Implementación vigente · leído del código, no de un diseño previo.**

Este documento describe **cómo está construido el sitio hoy**. Los archivos `docs/01-brandbook.md` a `docs/04-productos-servicios.md` son el registro del diseño de 2025 —tema claro, acento negro— que este rediseño reemplazó: sirven como historia, no como referencia de implementación.

El reparto entre los dos documentos vigentes:

| Documento | Qué define |
|---|---|
| `DESIGN-2026.md` | Dirección visual, catálogo de servicios, planes y precios. La decisión de negocio. |
| Este archivo | Tokens, tipografía, grilla, anatomía de componentes y el sistema de animaciones. La implementación. |

Cuando el código y este documento no coincidan, gana el código: `app/globals.css` es la fuente.

---

## 1. Tokens

Definidos en `:root` de `app/globals.css` y expuestos a Tailwind en `tailwind.config.ts`.

### 1.1 Color

Los colores se guardan como **tripletas RGB sin envolver**, no como hex. Es lo que permite que Tailwind los use con opacidad variable (`bg-cc-surface/60`): el config los arma con `rgb(var(--cc-bg) / <alpha-value>)`, y eso no funciona con un hex.

| Token | Tripleta | Hex | Uso |
|---|---|---|---|
| `--cc-bg` | `10 12 18` | `#0A0C12` | Fondo del documento |
| `--cc-text` | `246 242 236` | `#F6F2EC` | Títulos y texto de alto contraste |
| `--cc-text-body` | `180 182 192` | `#B4B6C0` | Cuerpo de texto |
| `--cc-text-label` | `218 217 221` | `#DAD9DD` | Labels y UI secundaria |
| `--cc-muted` | `140 143 155` | `#8C8F9B` | Metadata, placeholders |
| `--cc-accent` / `--cc-warm` | `255 171 121` | `#FFAB79` | CTA, links, acentos |
| `--cc-accent-hover` | `255 192 153` | `#FFC099` | Hover sobre acento |
| `--cc-warm-deep` | `255 190 151` | `#FFBE97` | Variante cálida sobre fondo claro |
| `--cc-accent-light` / `--cc-warm-light` | `52 37 37` | `#342525` | Fondo de badges y chips cálidos |
| `--cc-surface` | `21 24 33` | `#151821` | Superficie elevada |

### 1.2 Escala de oscuros por sección

El sitio no usa un solo fondo: alterna una escala corta de oscuros para separar secciones sin líneas. Estos valores están escritos directo en cada regla, no tokenizados.

| Sección | Fondo |
|---|---|
| Hero | `#0B0E19` + tres gradientes radiales (azul, violeta, naranja) |
| Barra de disciplinas, Servicios, Cómo trabajamos, FAQ | `#0E1018` |
| Casos | `#11131B` |
| Productos | `#151720` |
| CTA final | Gradiente `#151720 → #17131B` + halo naranja inferior |
| Footer | `#0A0C12` |
| Hero de páginas interiores | `#11131D` + dos gradientes |
| Secciones interiores alternas | `#141720` |

Las cards van un escalón por encima de su sección: servicios `#191C27`, casos `#1B1D27`, productos `#1D202B` y `#201E2B`, tiles y planes `#1B1E29`.

### 1.3 Radios

| Token | Valor |
|---|---|
| `--cc-radius-sm` | 5px |
| `--cc-radius-md` | 12px |
| `--cc-radius-lg` | 20px |
| `--cc-radius-xl` | 28px |

---

## 2. Tipografía

| Rol | Fuente | Carga |
|---|---|---|
| Display | Clash Display, variable 200–700 | Self-hosted en `public/fonts/`, `font-display: swap`, con `<link rel="preload">` en `app/layout.tsx` |
| Cuerpo | DM Sans | `next/font/google`, expuesta como `--cc-font-body` |

La clase `.display` fija el carácter de los titulares: peso 500, `letter-spacing: -.045em`, `line-height: 1.05`.

### Escalas reales

Casi todos los titulares son fluidos. Los valores son los del código:

| Elemento | Desktop | Móvil (≤700px) |
|---|---|---|
| H1 del hero | `clamp(3.4rem, 7.2vw, 6rem)`, `line-height: .98` | `clamp(2.6rem, 11vw, 4.4rem)` |
| H2 de sección | `clamp(2.65rem, 5.1vw, 5.2rem)` | `clamp(2.5rem, 11vw, 3.7rem)` |
| H1 interior | `clamp(3.2rem, 6.3vw, 6.5rem)` | `clamp(3rem, 11vw, 4.5rem)` |
| H2 del CTA final | `clamp(3rem, 6vw, 6.2rem)` | — |
| H3 de card de servicio | `clamp(28px, 3vw, 42px)` | — |
| H3 de card de producto | `clamp(35px, 4vw, 54px)` | — |

El tope del H1 del hero está puesto en 6rem por una razón concreta, no estética: arriba de ~1330px la segunda línea (`Tecnología que acompaña.`) dejaba de entrar en el `max-width` y el titular se partía en tres líneas, empujando la card del hero fuera del primer print. El umbral real está entre 94 y 98px de tamaño, así que el `max-width` subió a 1160px para dejar margen: con 1030px el ajuste quedaba a menos de un píxel del corte.

### Texto de apoyo

| Clase | Definición |
|---|---|
| `.eyebrow` | 11px, peso 700, `letter-spacing: .17em`, mayúsculas, `#FFB88D` |
| `.body-copy` | `#B8B9C3`, `line-height: 1.7` |

`.eyebrow` es un `<span>` sin `display` propio, o sea **inline**. Eso importa al animarlo: un elemento inline ignora `transform`, así que de la entrada solo se vería el fundido. Por eso existe `.eyebrow[data-enter], .eyebrow[data-reveal] { display: inline-block }`, acotado a los que animan para no cambiar el resto del sitio.

---

## 3. Grilla y breakpoints

```css
.site-container { width: min(1200px, calc(100% - 56px)); margin-inline: auto; }
.site-section   { padding-block: 112px; }
```

En móvil: contenedor `min(100% - 36px, 500px)` y secciones de 78px.

El sitio tiene **dos breakpoints principales**, más dos acotados para el ícono de las cards de servicio:

| Media query | Qué cambia |
|---|---|
| `max-width: 900px` | Casos pasan a 2 columnas con el primero a ancho completo; se achican los gaps del proceso y la navegación |
| `max-width: 700px` | Todas las grillas colapsan a 1 columna; navbar pasa a hamburguesa; contenedor y secciones se achican |
| `min-width: 701px and max-width: 900px` | Ícono de servicio a 84px |
| `max-width: 380px` | Ícono de servicio a 62px |

Los dos últimos van acotados por los dos lados a propósito. Escrito como `max-width: 900px` a secas, el rango intermedio también alcanza a los teléfonos y —por estar más abajo en el archivo— le gana por orden al tamaño de móvil, que queda sin efecto. Es un error que ya ocurrió una vez.

---

## 4. Componentes del home

El orden de la página es: Hero → barra de disciplinas → Servicios → Casos → Cómo trabajamos → Productos → FAQ → CTA final.

### 4.1 Hero

- `min-height: 870px`, `padding-top: 158px` (móvil: 790px / 132px)
- Fondo por capas: `::before` con tres gradientes radiales, `::after` con un halo naranja difuminado, y `.hero-grain` con una textura SVG de ruido al 11%
- Coreografía de entrada: kicker 0ms, H1 0ms, bajada 80ms, botones 140ms, caption 180ms

La **ventana del hero** (`.hero-window`) simula una ventana de iOS: barra de estado con la hora y los íconos de señal, wifi y batería; la foto de Colonia como pantalla; una hoja de vidrio con `backdrop-filter` sobre ella; y la barra de inicio abajo. La hora es 9:41, la que Apple usa en sus maquetas desde la primera presentación del iPhone.

Dos cosas que conviene no revertir:

**No lleva margen inferior negativo.** La card anterior lo tenía para montarse sobre la sección siguiente, y era lo que la hacía verse cortada en recto, sin esquinas redondeadas y sin la línea de ubicación. Primero porque `.hero` recortaba con `overflow: hidden`; al sacarlo, porque las cajas quedaban solapadas 38px y quién se pinta encima lo decide el orden de pintado —en Chromium gana la ventana, pero es un empate que otro motor puede resolver al revés—. Medido con el margen y sin él, el borde se ve idéntico.

**`.hero` ya no lleva `overflow: hidden`.** Tampoco sirve cambiarlo por `overflow-x: hidden` para contener el halo de `::after`, que se extiende un 20% a cada lado: en cuanto un eje deja de ser `visible`, el otro pasa a `auto` y vuelve a recortar en vertical. El desborde horizontal ya lo contienen `html` y `body`.

### 4.2 Cards de servicio

`min-height: 340px`, padding 34px, borde de 1px y radio de 20px. Cada card lleva:

- Un **glow** propio en `::before`, distinto por posición: naranja, violeta, azul y rosa para las cards 1 a 4. Se resuelve con `:nth-child`, así que las cards tienen que ser hijas directas de la grilla — por eso el componente `Reveal` renderiza el propio `<Link>` en vez de envolverlo.
- Una **ilustración** de un hito de Colonia, alineada con el número del servicio: el Portón de Campo (diseño web), el faro (marketing), el caracol (infraestructura) y la plaza de toros (IA). A color pleno, sin recuadro, 104px de caja (84 / 72 / 62 según el rango).
- Hover: borde cálido, fondo un escalón más claro y `translateY(-4px)`.

Dos decisiones que conviene no revertir sin volver a medir:

**La ilustración va dentro de `.service-card-top`, no flotando encima.** Como el bloque de texto lleva `margin-top: auto`, al ocupar lugar en el flujo lo empuja hacia abajo y no hay ancho de pantalla en el que puedan pisarse. Flotándola, entre 700 y 900px —donde la grilla sigue en dos columnas y las cards se angostan— el titular subía y se le metía debajo.

**`max-width` y `max-height` actúan juntos.** Las proporciones no se parecen: el Portón es vertical (638×831) y la Plaza casi un panorama (433×209). Con una sola de las dos medidas, una quedaría enorme al lado de la otra.

### 4.3 Resto de las secciones

| Sección | Estructura |
|---|---|
| Barra de disciplinas | Flex de una frase y cuatro palabras; en móvil pasa a bloque |
| Casos | Grilla `1.35fr 1fr 1fr`, cards de 430px con el primero en degradado |
| Cómo trabajamos | Dos columnas `.95fr 1.05fr`: foto de 580px a un lado, cuatro pasos numerados al otro |
| Productos | Dos cards de 540px con una maqueta de ventana flotante como visual |
| FAQ | `<details>` nativos, lista de 850px centrada |
| CTA final | Centrado, 118px de padding vertical, con halo naranja |

---

## 5. Animaciones de entrada

El sistema vive en `app/globals.css` y en `components/ui/Reveal.tsx`. Son **dos familias separadas a propósito**.

### 5.1 `[data-enter]` — al cargar

CSS puro, sin JavaScript. Es la única apta **arriba del fold**: pasar el hero por un observer lo dejaría esperando a la hidratación. El `fill-mode: both` es lo que la hace funcionar sin JS — aplica el fotograma inicial durante el delay.

### 5.2 `[data-reveal]` — al entrar en viewport

Vía el `IntersectionObserver` de `Reveal.tsx`, con `threshold: .15` y `rootMargin: 0 0 -10% 0`. Dispara una sola vez y se desconecta.

`Reveal` es polimórfico y reenvía props: renderiza la etiqueta final —`article`, `details`, `figure`, `a`, `Link`— sin agregar un nodo intermedio. No es un detalle de estilo: sin eso dejarían de funcionar los selectores estructurales que ya existen (`.case-card:first-child`, `.faq-list details:last-child`, los `nth-child` del glow y del escalonado).

El estado oculto es **solo opacidad**, y tampoco es una simplificación. `IntersectionObserver` calcula el área del elemento ya recortada y transformada: un estado oculto con `clip-path: inset(0 0 100% 0)` da ratio 0 y uno con `translateY(100%)` da 0.1 — con threshold .15 ninguno dispararía nunca y el contenido quedaría invisible para siempre. La opacidad es la única propiedad que el observer ignora. Por eso el desplazamiento, el recorte y el desenfoque viven en el fotograma `from` de cada animación.

### 5.3 Variantes

Easing por defecto `cubic-bezier(.2, .8, .2, 1)`; `clip-up` usa `cubic-bezier(.65, 0, .35, 1)`.

| Variante | Duración | Desde |
|---|---|---|
| `fade-up` | .5s | opacidad 0, `translateY(16px)` |
| `blur-in` | .6s | opacidad 0, `translateY(14px)`, `blur(8px)` |
| `rise` | .55s | `translateY(18px)`, **sin tocar la opacidad** |
| `rise-blur` | .75s | `translateY(20px)` + `blur(10px)`, **sin tocar la opacidad** |
| `card-lift` | .8s | opacidad 0, `translateY(24px)` |
| `image-scale` | 1.2s | opacidad 0, `scale(1.08)` |
| `clip-up` | .9s | `clip-path: inset(0 0 100% 0)` |
| `line-rise` | .9s | `translateY(100%)` dentro de `.line-mask` |

Solo se animan propiedades compositadas: opacidad, transform, filter y clip-path. Nada que toque el layout, así el CLS queda en 0. Por eso no hay variante de `letter-spacing`: animarlo cambia el ancho del texto y corre a los vecinos.

### 5.4 El elemento LCP

**El H1 del hero usa `rise` y no una variante con fundido.** Medido sobre este sitio con CPU 4x lenta y red 5Mbps, mediana de 5 corridas:

| Variante sobre el H1 | LCP | Costo sobre la base |
|---|---|---|
| Base de referencia (sin animar) | 772ms | — |
| `rise` (solo transform) | 768ms | sin costo |
| `fade-up` (fundido .5s) | 1148ms | +376ms |
| `line-rise` (máscara) | 1176ms | +404ms |

Chrome registra el LCP cerca del **final** del fundido, no en el primer fotograma con opacidad mayor a cero: un fade sobre el elemento LCP cuesta casi su duración entera, y acortar el delay no lo salva. `line-rise` es peor todavía porque la máscara con `overflow: hidden` deja el texto sin pintar en ningún lado visible, Chrome lo descarta como candidato y el LCP cae en el siguiente elemento grande.

Con el H1 actual —más chico que el de aquella medición— la base era **604ms**.

**Hoy el elemento LCP no es el H1 sino la ventana del hero**, que al crecer pasó a ser lo más grande del primer print. Eso volvió a poner a prueba la misma regla, y la respuesta está medida:

| Cómo entra la ventana | LCP |
|---|---|
| Por observer, con `blur-in` | 1408ms |
| Con `data-enter` y `rise-blur` | ~780ms |

Los 1408ms salen de sumar dos cosas: detrás del observer queda en `opacity: 0` hasta la hidratación, y encima Chrome registra el LCP recién al final del fundido. Por eso la ventana entra con `data-enter` —se pinta al cargar, sin esperar JavaScript— y con una variante que mueve y desenfoca pero nunca baja la opacidad.

Al tocar el tamaño o la entrada de cualquier elemento grande del hero, volver a medir: el elemento LCP puede cambiar de identidad sin aviso.

### 5.5 Escalonado

El contenedor lleva `.stagger` y los hijos reciben `--cc-d` de 80ms en 80ms, hasta 400ms en el sexto.

Solo aplica **de 701px para arriba**, y es deliberado: cada hijo tiene su propio observer, así que el retardo se cuenta desde que ese hijo entra en viewport, no desde que entra la grilla. En desktop los elementos entran juntos y se lee como cascada; en móvil, donde la grilla colapsa a una columna y cada card entra sola, el mismo retardo sería un tironeo de hasta 240ms antes de que aparezca cada una.

### 5.6 Degradación

- **`prefers-reduced-motion: reduce`**: apaga explícitamente `[data-enter]` y `[data-reveal]`, además del bloque general que deja todo en .01ms. Verificado: 47 elementos, ninguno animando, ninguno oculto.
- **Sin JavaScript**: el estado oculto vive dentro de `@media (scripting: enabled)`, así que el contenido se ve siempre. Preferimos texto quieto antes que texto invisible.

---

## 6. Accesibilidad

### 6.1 Foco y semántica

- `:focus-visible` global: `outline: 2px solid #ffab79`, `offset: 4px`
- Ilustraciones decorativas: `alt=""` y `aria-hidden="true"` — el nombre del servicio ya está en el `<h3>` de al lado, y describirlas otra vez haría leer dos veces lo mismo
- Cada sección lleva `aria-labelledby` apuntando a su titular

### 6.2 Cómo medir contraste acá

El texto vive sobre fondos con gradientes, halos e ilustraciones, así que un hex contra otro hex no alcanza. El método que se usó:

1. Tomar los rectángulos **reales de los glifos** con `Range.getClientRects()` sobre cada nodo de texto. Usar la caja del elemento da falsos negativos: un `<h3>` ocupa 522px de ancho aunque "Diseño web" mida 200.
2. Ocultar el texto, capturar la card y leer los píxeles de esa región.
3. Tomar el píxel **más claro** de cada zona y calcular el contraste contra el color del texto. Es el peor caso.

Con ese método se detectó que las ilustraciones de fondo dejaban la card de IA en 4.11:1, por debajo del mínimo AA de 4.5. Al moverlas fuera de la columna de lectura, las cuatro cards miden 7.61:1.

### 6.3 Verificación antes de publicar

Lo que conviene correr sobre el build de producción:

- Que los 42 reveals disparen y ninguno quede en `opacity: 0` — el modo de falla del observer es contenido invisible para siempre
- CLS en 0, en desktop y móvil
- Que ninguna ilustración toque texto ni se salga de su card, barriendo anchos de 320 a 2560px
- `prefers-reduced-motion` y JavaScript apagado

---

## 7. Fuentes de datos

Una sola fuente por dominio, sin duplicar contenido entre páginas:

| Archivo | Alimenta |
|---|---|
| `lib/services.ts` | Home, `/servicios`, las cuatro fichas y el footer |
| `lib/productos.ts` | Sección de productos |
| `lib/casos.ts` | Casos del home |
| `lib/contact.ts` | Enlaces de WhatsApp con mensaje prellenado |

Rutas públicas: `/`, `/servicios`, `/servicios/[slug]`, `/nosotros`, `/contacto`, `/gracias`, `/privacidad`, `/terminos`. `/blog`, `/login` y `/dashboard` existen como esqueletos vacíos con `noindex`.

El formulario de contacto envía por Resend desde `app/api/contact/route.ts` y necesita `RESEND_API_KEY`.
