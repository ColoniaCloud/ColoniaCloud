# Colonia Cloud — UI Spec
**Sistema de Interfaz de Usuario — Etapa 2 · v1.0 · 2025**
*colonia.cloud — Llevamos tu negocio a la nube*

---

## 1. Introducción

Este documento define el sistema de interfaz de usuario (UI) de Colonia Cloud. Sirve como referencia única para diseñadores y desarrolladores durante las etapas de desarrollo del sitio público (Etapa 5) y el backend de clientes (Etapa 6).

El sistema está construido sobre el brandbook de la Etapa 1 y garantiza consistencia visual, accesibilidad y escalabilidad en todos los productos digitales de Colonia Cloud.

---

## 2. Design Tokens

Los tokens son las variables base del sistema. Todo componente debe referenciar estos valores — **nunca usar valores hardcodeados**.

### 2.1 Paleta de colores

| Token CSS | Hex | Nombre | Uso |
|---|---|---|---|
| `--cc-bg` | `#FFFAFA` | Blanco cálido | Fondo principal de todas las superficies |
| `--cc-text` | `#000000` | Negro | Títulos y texto de alto contraste |
| `--cc-text-body` | `#555555` | Gris medio | Cuerpo de texto y párrafos |
| `--cc-text-label` | `#333333` | Gris oscuro | Labels, UI secundaria, subtítulos |
| `--cc-muted` | `#A9A793` | Topo / Arena | Placeholders, separadores, metadata |
| `--cc-accent` | `#C17A5A` | Terracota | CTAs, botones primarios, links, highlights |
| `--cc-accent-hover` | `#A8634A` | Terracota oscuro | Estado hover sobre elementos terracota |
| `--cc-accent-light` | `#F5EDE8` | Terracota claro | Fondos de íconos, badges, estados activos |
| `--cc-surface` | `#F3EFEC` | Arena claro | Secciones alternadas, fondo de pasos |

> **Regla crítica:** Nunca usar blanco puro (`#FFFFFF`) en superficies grandes. Siempre `#FFFAFA` como fondo principal.

### 2.2 Tipografía

| Rol | Fuente | Peso | Tamaño | Uso |
|---|---|---|---|---|
| Display | Clash Display | 500 Medium | 40px / 2.5rem | Hero principal |
| H1 | Clash Display | 500 Medium | 28px / 1.75rem | Títulos de sección |
| H2 | Clash Display | 500 Medium | 22px / 1.375rem | Subtítulos |
| H3 | Clash Display | 500 Medium | 18px / 1.125rem | Cards, componentes |
| Body | DM Sans | 400 Regular | 16px / 1rem | Párrafos principales |
| Small | DM Sans | 400 Regular | 14px / 0.875rem | Descripciones, hints |
| Caption | DM Sans | 400 Regular | 12px / 0.75rem | Metadata, fechas, pie |
| Label / Botón | DM Sans | 500 Medium | 13–14px | Botones, labels UI |

> Clash Display: solo en títulos y headings. DM Sans: todo lo demás. Mínimo 12px para cualquier texto visible en pantalla.

### 2.3 Espaciado

Escala base de 4px. Todos los espaciados deben ser múltiplos de esta unidad.

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 4px | Gap mínimo entre íconos y texto inline |
| `--space-2` | 8px | Gap entre badges, tags, elementos inline |
| `--space-3` | 12px | Padding interno de componentes pequeños |
| `--space-4` | 16px | Gap entre elementos en listas, padding de cards sm |
| `--space-6` | 24px | Padding interno de cards, gap entre columnas |
| `--space-8` | 32px | Margen entre secciones de componente |
| `--space-12` | 48px | Padding horizontal de contenedor principal |
| `--space-16` | 64px | Padding vertical de secciones de página |
| `--space-18` | 72px | Padding vertical hero y CTA |

### 2.4 Border radius

| Token | Valor | Uso |
|---|---|---|
| `--cc-radius-sm` | 2px | Tags, indicadores pequeños |
| `--cc-radius-md` | 6px | Botones, inputs, badges, selects |
| `--cc-radius-lg` | 10px | Cards de contenido, navbar, paneles |
| `--cc-radius-xl` | 16px | Cards de pricing, modales, página wrapper |
| `--cc-radius-full` | 9999px | Badges pill, avatares, toggles |

---

## 3. Componentes Base

### 3.1 Botones

| Variante | Fondo | Texto / Borde | Uso |
|---|---|---|---|
| Primary | `#C17A5A` (terracota) | Blanco / Sin borde | Acción principal, CTA de página |
| Secondary | Transparente | Terracota / Borde terracota | Acción secundaria |
| Ghost | Transparente | Gris medio / Borde gris | Tercera opción, cancelar |
| Icon | `#C17A5A` (terracota) | Ícono blanco / Sin borde | Acciones compactas, toolbar |

#### Tamaños

| Talla | Padding | Font size | Contexto |
|---|---|---|---|
| sm | 7px 14px | 13px | Tablas, componentes compactos |
| md (default) | 10px 20px | 14px | Uso general |
| lg | 13px 28px | 15px | Hero, CTA principales |

#### Estados

- **Default:** color base definido por variante
- **Hover:** fondo 10% más oscuro (primary) o fondo `--cc-accent-light` (secondary)
- **Active:** `transform: scale(0.97)` — feedback táctil
- **Disabled:** `opacity: 0.38`, `pointer-events: none`
- **Loading:** spinner inline + texto "Cargando…", deshabilitado implícitamente

### 3.2 Inputs de texto

| Estado | Borde | Box shadow |
|---|---|---|
| Default | `1px solid rgba(0,0,0,0.11)` | Ninguno |
| Hover | `1px solid rgba(0,0,0,0.20)` | Ninguno |
| Focus | `1px solid #C17A5A` | `0 0 0 3px rgba(193,122,90,0.15)` |
| Error | `1px solid #C0392B` | `0 0 0 3px rgba(192,57,43,0.12)` en focus |
| Disabled | `1px solid rgba(0,0,0,0.06)` | Ninguno, `opacity: 0.45` |

> Padding interno: `9px 12px`. Con ícono a la izquierda: `padding-left: 36px`. Ícono posicionado `absolute` a `left: 11px`.

### 3.3 Badges

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| Accent | `#F5EDE8` | `#7A3E25` | Novedades, destacados de marca |
| Success | `#E6F4EC` | `#1E6E3A` | Activo, publicado, completado |
| Warning | `#FDF3E0` | `#7A5A0A` | Pendiente, revisión requerida |
| Danger | `#FCECEA` | `#8C2020` | Vencido, error, cancelado |
| Neutral | `#F3EFEC` | `#333333` | Beta, draft, sin estado definido |

---

## 4. Componentes Compuestos

### 4.1 Cards

#### Service card
- Padding: 20–22px
- Border: `0.5px solid rgba(0,0,0,0.10)`
- Border radius: `--cc-radius-lg` (10px)
- Hover: border-color terracota + `box-shadow: 0 0 0 3px --cc-accent-light`
- Estructura: ícono (40×40px, fondo accent-light) → título H3 → descripción body-sm → link con flecha

#### Pricing card
- Border radius: `--cc-radius-xl` (16px)
- Featured: `border: 1.5px solid terracota` + fondo `--cc-accent-light`
- No-featured: `border: 0.5px solid` gris estándar
- Estructura: badge (opcional) → nombre plan → precio → lista de features → botón

#### Testimonial card
- Border izquierdo: `3px solid terracota` (sin border-radius en ese lado)
- Otros bordes: `0.5px solid` gris
- Fondo: `--cc-surface` (`#F3EFEC`)
- Estructura: estrellas → cita en cursiva → avatar + nombre + rol

#### Stat card
- Fondo: `--cc-surface`
- Valor: Clash Display 28px
- Label: DM Sans 13px, color `--cc-muted`
- Delta: 12px verde, con ícono `ti-trending-up`

### 4.2 Navbar

- Altura: 58px
- Padding horizontal: 28px
- Fondo: `--cc-bg` con `border-bottom: 0.5px` gris
- Logo: cuadrado 28×28px, fondo terracota, border-radius md, texto "CC" blanco
- Brand name: Clash Display 15px
- Links: DM Sans 13px, color gris-body; activo/hover: terracota
- CTA: botón primario sm (`8px 16px`, 13px)

### 4.3 Alertas

| Tipo | Fondo | Borde | Uso |
|---|---|---|---|
| Success | `#E6F4EC` | `#9FD4B5` | Confirmaciones, acciones completadas |
| Info | `#E8F1FB` | `#B5CEEF` | Información neutral, actualizaciones |
| Warning | `#FDF3E0` | `#F0D08A` | Atención requerida, próximo vencimiento |
| Danger | `#FCECEA` | `#F0AAAA` | Errores, fallos críticos |
| Accent | `#F5EDE8` | `rgba(193,122,90,0.3)` | Promociones y novedades de marca |

### 4.4 Footer

- Fondo: `#000000` (negro puro)
- Layout: grid 3 columnas (`1.6fr 1fr 1fr`)
- Columna 1: brand name, tagline, íconos de redes sociales
- Columnas 2–3: listas de links con títulos en uppercase 11px, color `rgba(255,255,255,0.35)`
- Links: 13px, color `rgba(255,255,255,0.6)`, hover: terracota
- Bottom bar: `border-top: rgba(255,255,255,0.08)`, copyright izquierda, dominio derecha
- Íconos sociales: 30×30px, fondo `rgba(255,255,255,0.07)`, hover: fondo terracota

---

## 5. Layout y Grid

### 5.1 Breakpoints

| Nombre | Min-width | Columnas | Notas |
|---|---|---|---|
| xs (mobile) | 0px | 1 | Stack total. Navbar → hamburger. |
| sm (mobile L) | 480px | 1–2 | Cards pueden ir en 2 columnas. |
| md (tablet) | 768px | 2 | Hero: 2 col. Services: 2 col. Footer: 2 col. |
| lg (desktop) | 1024px | 3 | Layout completo. Services: 3 col. Steps: 4 col. |
| xl (wide) | 1280px | 3–4 | Max-width del contenedor: 1280px, centrado. |

> Usar `repeat(auto-fit, minmax(180px, 1fr))` para grids de cards.

### 5.2 Contenedor principal

- Max-width: 1280px
- Padding horizontal: 48px desktop / 24px tablet / 16px móvil
- Centrado con `margin: 0 auto`

### 5.3 Secciones de página

| Sección | Fondo | Padding vertical |
|---|---|---|
| Navbar | `--cc-bg` | Altura fija 58px |
| Hero | `--cc-bg` | 72px arriba, 64px abajo |
| Logos bar | `--cc-bg` | 20px arriba y abajo |
| Servicios | `--cc-bg` | 64px arriba y abajo |
| Cómo trabajamos | `--cc-surface` | 64px arriba y abajo |
| Testimonios | `--cc-bg` | 64px arriba y abajo |
| CTA final | `#000000` | 72px arriba y abajo |
| Footer | `#000000` | 32px arriba, 20px abajo |

---

## 6. Accesibilidad

### 6.1 Contraste de color

- Texto negro (`#000`) sobre `--cc-bg`: ratio 20.7:1 — cumple AAA
- Texto gris medio (`#555`) sobre `--cc-bg`: ratio 7.4:1 — cumple AA
- Texto blanco sobre terracota (`#C17A5A`): ratio 3.1:1 — cumple AA para texto grande
- Nunca usar gris claro (`#A9A793`) como texto principal — solo metadata/placeholder

### 6.2 Estados de foco

- Input en focus: `box-shadow: 0 0 0 3px rgba(193,122,90,0.15)` + borde terracota
- Botones en focus: `outline: 2px solid terracota`, `offset: 2px`
- No usar `outline: none` sin reemplazarlo por un estilo alternativo claro

### 6.3 Semántica HTML

- Íconos decorativos: `aria-hidden="true"`
- Íconos funcionales (botón solo con ícono): `aria-label` descriptivo
- Imágenes: `alt` text descriptivo siempre
- Formularios: `label` asociado a cada input (`for` + `id`)
- Landmarks: `<nav>`, `<main>`, `<section>`, `<footer>` correctamente usados

---

## 7. Animaciones y Transiciones

| Elemento | Propiedad | Valor |
|---|---|---|
| Botones — color | transition | `background 0.15s ease` |
| Inputs — borde | transition | `border-color 0.15s, box-shadow 0.15s` |
| Cards — hover | transition | `border-color 0.2s, box-shadow 0.2s` |
| Links — color | transition | `color 0.15s ease` |
| Toggle — posición | transition | `left 0.2s ease, background 0.2s ease` |
| Botón — press | transform | `scale(0.97)` en `:active` |
| Spinner | animation | `rotate 0.7s linear infinite` |

> Respetar `prefers-reduced-motion`: envolver con `@media (prefers-reduced-motion: reduce) { transition: none; }`

---

## 8. Variables CSS — Referencia completa

```css
:root {
  /* Colores */
  --cc-bg: #FFFAFA;
  --cc-text: #000000;
  --cc-text-body: #555555;
  --cc-text-label: #333333;
  --cc-muted: #A9A793;
  --cc-accent: #C17A5A;
  --cc-accent-hover: #A8634A;
  --cc-accent-light: #F5EDE8;
  --cc-surface: #F3EFEC;

  /* Tipografía */
  --cc-font-display: 'Clash Display', sans-serif;
  --cc-font-body: 'DM Sans', sans-serif;

  /* Border radius */
  --cc-radius-sm: 2px;
  --cc-radius-md: 6px;
  --cc-radius-lg: 10px;
  --cc-radius-xl: 16px;
}
```

---

## 9. Checklist de Implementación

### Diseño
- [ ] ¿Usa los tokens CSS definidos en el `:root`? (sin valores hardcodeados)
- [ ] ¿Respeta la tipografía: Clash Display para títulos, DM Sans para el resto?
- [ ] ¿El fondo es `#FFFAFA`, no `#FFFFFF`?
- [ ] ¿Los CTAs y elementos interactivos usan terracota (`#C17A5A`)?
- [ ] ¿Los border-radius corresponden a la escala definida?

### Interactividad
- [ ] ¿Todos los estados están cubiertos: default, hover, focus, active, disabled?
- [ ] ¿El foco es visible sin usar `outline: none` sin reemplazo?
- [ ] ¿Los íconos decorativos tienen `aria-hidden="true"`?
- [ ] ¿Los formularios tienen labels asociados a sus inputs?

### Responsive
- [ ] ¿El layout funciona en móvil (375px) sin overflow horizontal?
- [ ] ¿Las grids usan `auto-fit/minmax` en lugar de columnas fijas?
- [ ] ¿El navbar tiene versión móvil (hamburger o stack)?
- [ ] ¿El texto mínimo es 12px en cualquier viewport?

### Performance
- [ ] ¿Las fuentes están cargadas vía fontsource (Clash Display) y Google Fonts (DM Sans)?
- [ ] ¿Se usa `font-display: swap` para evitar FOIT?
- [ ] ¿Las transiciones respetan `prefers-reduced-motion`?

---

*Colonia Cloud — UI Spec v1.0 · Etapa 2 · 2025*
