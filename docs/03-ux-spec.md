# Colonia Cloud — UX Spec
**Especificaciones de Experiencia de Usuario — Etapa 3 · v1.0 · 2025**
*colonia.cloud — Llevamos tu negocio a la nube*

---

## 1. Introducción

Este documento define la experiencia de usuario (UX) de Colonia Cloud. Complementa el Brandbook (Etapa 1) y el UI Spec (Etapa 2), y sirve como referencia de comportamiento y flujo para el desarrollo del sitio público (Etapa 5) y el backend de clientes (Etapa 6).

La UX de Colonia Cloud está diseñada para un visitante tipo: dueño o responsable de un negocio local en Colonia del Sacramento, no técnico, con poco tiempo, que necesita confiar antes de contactar.

---

## 2. Arquitectura de la Información

El sitio se organiza en dos mundos separados: el **sitio público** para atraer y convertir clientes nuevos, y el **backend privado** para que clientes existentes gestionen sus servicios.

### 2.1 Sitio Público — 13 páginas

| Página | Nivel | Descripción |
|---|---|---|
| Inicio (Home) | Principal | Hero, servicios, proceso, testimonios, CTA final |
| Servicios | Secundaria | Detalle de cada servicio ofrecido |
| Nosotros | Secundaria | Equipo, historia y contexto local |
| Contacto | Secundaria | Formulario (3 campos) + botón WhatsApp |
| Blog | Secundaria | Listado de artículos sin categorías |
| Casos de uso | Derivada | Ejemplos por industria o sector |
| Artículo individual | Derivada | Vista de post del blog |
| Gracias | Derivada | Confirmación de envío de formulario |
| Privacidad | Legal | Política de privacidad |
| Términos | Legal | Términos y condiciones |

### 2.2 Backend de Clientes

| Vista | Acceso | Descripción |
|---|---|---|
| Login | Público | Acceso por invitación — sin registro público |
| Dashboard | Autenticado | Resumen de cuenta, estado de servicios y alertas |
| Mis servicios | Autenticado | Servicios contratados con estados y detalle |
| Facturación | Autenticado | Historial de pagos y descarga de comprobantes |
| Soporte | Autenticado | Envío y seguimiento de tickets |
| Mi perfil | Autenticado | Datos personales y cambio de contraseña |

> El acceso al backend es únicamente por invitación enviada por el equipo de Colonia Cloud. No existe registro público en esta versión.

---

## 3. User Journey Principal

| Etapa | Detalle |
|---|---|
| **1. Descubrimiento** | Canal: Google local, boca a boca, Instagram. Estado: curioso y escéptico. Necesita: encontrar el sitio fácilmente. |
| **2. Primera impresión** | Página: Home. Estado: evaluando, en duda. Necesita: entender la propuesta en menos de 5 segundos. |
| **3. Evaluación** | Páginas: Servicios, Nosotros, Casos. Estado: interesado, comparando. Necesita: prueba social local y claridad en la oferta. |
| **4. Decisión** | Páginas: Contacto, WhatsApp. Estado: motivado, algo nervioso. Necesita: una forma de contacto sin fricción. |
| **5. Conversión** | Páginas: Gracias, Email. Estado: aliviado, expectante. Necesita: confirmación y tiempo de respuesta claro. |

### Puntos de fricción críticos

- **Etapa 2:** si el hero no comunica en 5 segundos, el visitante abandona.
- **Etapa 3:** sin prueba social local ni referencia de precios, desconfía.
- **Etapa 4:** formulario largo o WhatsApp invisible genera abandono.
- **Etapa 5:** sin confirmación inmediata, el visitante queda en incertidumbre.

### Decisiones clave del journey

| Variable | Decisión |
|---|---|
| Canal principal de conversión | WhatsApp. El formulario existe como alternativa. |
| Tiempo de respuesta prometido | Menos de 24 horas hábiles. |
| Campos del formulario | Mínimos: Nombre, Email y Mensaje. |
| Página Gracias | Confirmar envío + dar tiempo de respuesta + ofrecer WhatsApp ahora. |

---

## 4. Wireframes de Flujo

### 4.1 Home — Orden de secciones

| Sección | Contenido y propósito |
|---|---|
| **Navbar (fijo)** | Logo + links + botón WhatsApp CTA. Siempre visible. |
| **01 — Hero** | Titular + subtítulo + CTA WhatsApp primario + CTA secundario "Ver servicios". Above the fold. |
| **02 — Barra de confianza** | Íconos de sectores atendidos: restaurantes, comercios, profesionales. Sin logos (primera versión). |
| **03 — Servicios** | 3 cards: Desarrollo web, Marketing digital, Automatizaciones. Ícono + título + descripción + link. |
| **04 — Cómo trabajamos** | 4 pasos numerados: Consulta → Propuesta → Desarrollo → Soporte. Fondo `--cc-surface`. |
| **05 — Testimonios** | 2–3 testimonios de negocios locales de Colonia. Nombre, rubro y avatar. |
| **06 — CTA final** | Fondo negro. "¿Listo para llevar tu negocio a la nube?" + botón WhatsApp grande + promesa menos de 24h. |
| **Footer** | Links, redes sociales, dominio, copyright. Fondo negro. |

### 4.2 Páginas secundarias

| Página | Estructura |
|---|---|
| **Servicios** | Hero interno → Cards detalladas por servicio → FAQ → CTA WhatsApp |
| **Nosotros** | Historia y misión → Equipo → Por qué Colonia → CTA WhatsApp |
| **Contacto** | Botón WhatsApp prominente → Formulario (Nombre, Email, Mensaje) → Promesa respuesta |
| **Blog** | Listado de cards (título, fecha, resumen) → Vista de artículo con CTA al final |
| **Gracias** | Confirmación → Promesa de respuesta → Opción WhatsApp ahora → Link al Home |

---

## 5. Microinteracciones Clave

### 5.1 Navbar

| Elemento | Comportamiento |
|---|---|
| **Desktop** | Fijo en la parte superior. Al hacer scroll agrega sombra sutil. |
| **Móvil** | Hamburger menu. Al abrir: slide-down del menú con overlay. Cierra con tap fuera o en X. |
| **CTA WhatsApp** | Siempre visible en el navbar — no se oculta en scroll. |
| **Link activo** | Color terracota en la página actual. Transición `color 0.15s` en hover. |

### 5.2 Botón WhatsApp flotante

| Elemento | Comportamiento |
|---|---|
| **Posición** | Fixed, esquina inferior derecha, 24px desde el borde. |
| **Apariencia** | Círculo 56px, fondo terracota, ícono WhatsApp blanco. |
| **Desktop** | Oculto en el primer viewport. Aparece con fade-in tras 300px de scroll. |
| **Móvil** | Siempre visible desde el inicio de la página. |
| **Desaparece** | En ambos dispositivos: desaparece cuando el footer entra en el viewport. |
| **Hover** | `scale(1.08)` + tooltip "Escribínos" a la izquierda. Transición 0.2s. |

### 5.3 Formulario de contacto

| Elemento | Comportamiento |
|---|---|
| **Campos** | Nombre, Email, Mensaje — sin campos adicionales. |
| **Validación** | En tiempo real al salir del campo (`onBlur`). Error debajo del input en rojo. |
| **Labels** | Siempre visibles sobre el input — nunca desaparecen como placeholder. |
| **Envío** | Botón muestra estado "Enviando..." con spinner. Deshabilitado durante el proceso. |
| **Éxito** | Redirige a `/gracias`. Sin alert nativo del navegador. |
| **Error** | Alerta inline tipo Danger con mensaje claro y opción de reintentar. |

### 5.4 Animaciones de entrada

| Elemento | Comportamiento |
|---|---|
| **Tipo** | Fade-in + `translateY(16px → 0)` al entrar en viewport. |
| **Duración** | 0.4s ease-out. Delay máximo 0.1s por elemento. |
| **Cards en grid** | Entrada escalonada: delay 0s, 0.08s, 0.16s por card. |
| **Hero** | Sin animación de scroll — aparece instantáneo al cargar. |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` elimina todas las animaciones. |

### 5.5 Cards de servicios

| Elemento | Comportamiento |
|---|---|
| **Hover** | Border color terracota + `box-shadow: 0 0 0 3px accent-light`. Transición 0.2s. |
| **Link interno** | Flecha → al final de la card. En hover se desplaza 4px a la derecha. |
| **Móvil** | Sin hover. El estado activo (tap) aplica el efecto de borde brevemente. |

### 5.6 Navegación y scroll

| Elemento | Comportamiento |
|---|---|
| **Smooth scroll** | `scroll-behavior: smooth` en `:root`. Offset 70px para compensar navbar fijo. |
| **Anclas Home** | Links del navbar apuntan a secciones con IDs (`#servicios`, `#proceso`, `#contacto`). |
| **Links externos** | Siempre `target="_blank"` + `rel="noopener noreferrer"`. |
| **Back to top** | No incluido — el navbar fijo cubre esa necesidad. |

---

## 6. Flujo del Backend de Clientes

### 6.1 Flujo de acceso

| Paso | Detalle |
|---|---|
| **1. Invitación** | El equipo envía email con link de acceso al cliente. |
| **2. Crear contraseña** | El cliente define su contraseña en el primer acceso. |
| **3. Login** | Email + contraseña. Con opción de recuperar contraseña. |
| **4. Dashboard** | Vista principal con resumen de cuenta. |

### 6.2 Dashboard

- Resumen de cuenta: estado de servicios activos, próximo vencimiento, último movimiento.
- 3–4 stat cards: servicios activos, días hasta vencimiento, tickets abiertos, último pago.
- Acceso rápido a las 3 secciones principales.
- Banner de alerta si hay vencimiento próximo (menos de 7 días) o ticket sin respuesta.
- Botón WhatsApp siempre visible en el sidebar o header del backend.

### 6.3 Mis servicios

| Elemento | Detalle |
|---|---|
| **Lista** | Cards por servicio contratado: nombre, descripción breve, fecha de inicio. |
| **Estados posibles** | Activo / Pendiente / Vencido |
| **Detalle** | Click expande o navega a vista detalle con entregables y contacto asignado. |
| **Acción** | Botón "Consultar por este servicio" abre WhatsApp con mensaje pre-cargado. |

### 6.4 Facturación

| Elemento | Detalle |
|---|---|
| **Lista** | Tabla de pagos: fecha, concepto, monto, estado (Pagado / Pendiente / Vencido). |
| **Descarga** | Botón para descargar comprobante PDF por cada fila. |
| **Pago** | Sin pasarela integrada en esta versión. Botón "Coordinar pago" abre WhatsApp. |

### 6.5 Soporte

| Elemento | Detalle |
|---|---|
| **Tickets** | Lista de consultas: asunto, fecha, estado (Abierto / En proceso / Resuelto). |
| **Nuevo ticket** | Formulario simple: asunto + descripción + servicio relacionado (opcional). |
| **Respuesta** | Por email o WhatsApp — sin chat en tiempo real en esta versión. |

### 6.6 Mi perfil

- Datos editables: nombre, email, teléfono, nombre del negocio.
- Cambio de contraseña: flujo contraseña actual → nueva → confirmar.
- Edición inline — sin página separada.

---

## 7. Principios UX

Estos principios son criterios de decisión. Cuando haya que elegir entre dos soluciones, el que cumpla más principios gana.

### 01 — Confianza antes que información
> El visitante de Colonia decide con el estómago antes que con la cabeza.

- ✅ Testimonios reales con nombre y rubro
- ✅ Tono humano y cercano
- ❌ Jerga técnica en el hero
- ❌ Métricas vacías ("100% satisfacción")

### 02 — Un paso a la vez
> Cada página tiene una sola acción principal.

- ✅ Un CTA primario por sección
- ✅ Jerarquía visual clara
- ❌ Dos botones primarios juntos
- ❌ Pop-ups de suscripción al entrar

### 03 — WhatsApp es la puerta
> El canal de conversión principal es WhatsApp. El formulario es la alternativa, no el centro.

- ✅ WhatsApp visible en todo momento
- ✅ Mensajes pre-cargados con contexto
- ❌ Formulario de 8 campos
- ❌ WhatsApp enterrado en el footer

### 04 — Móvil primero, siempre
> El dueño de un restaurante en Colonia revisa el sitio desde el celular, probablemente en movimiento.

- ✅ Diseñar en mobile antes que desktop
- ✅ Botones de al menos 44px de alto
- ❌ Hover como única indicación de acción
- ❌ Tablas horizontales sin scroll

### 05 — Velocidad es respeto
> Un sitio lento dice que no valorás el tiempo del cliente.

- ✅ Imágenes optimizadas y lazy loading
- ✅ Fuentes con `font-display: swap`
- ❌ Animaciones pesadas sin propósito
- ❌ Librerías grandes para efectos menores

### 06 — El sistema es la fuente de verdad
> Cualquier decisión visual debe venir del UI Spec.

- ✅ Siempre tokens CSS del `:root`
- ✅ Componentes reutilizables
- ❌ Valores hex escritos directo en el CSS
- ❌ Estilos inline en el HTML

### Regla de desempate
> Cuando dos soluciones parecen equivalentes, elegir siempre la más simple.
> La complejidad tiene un costo de mantenimiento real para un equipo pequeño.

---

*Colonia Cloud — UX Spec v1.0 · Etapa 3 · 2025*
