<p align="center">
  <img src="https://colonia-cloud-eight.vercel.app/brand/logo.svg" alt="Colonia Cloud Logo" width="220"/>
</p>

<h3 align="center">Diseño y tecnología desde Colonia</h3>

<p align="center">
  <a href="https://colonia.cloud/">Sitio web</a> •
  <a href="https://wa.me/59896082266">WhatsApp</a>
</p>

## 🌐 Sobre Colonia Cloud

**Colonia Cloud** es un estudio de diseño y tecnología con base en Colonia del Sacramento, Uruguay.

Trabajamos en cuatro áreas conectadas:
- Diseño web
- Marketing digital
- Infraestructura cloud
- IA y automatizaciones

─────────────────────────────────────────────

## 🛠️ Nuestros Servicios

### Diseño web
Dos planes mensuales (web y web + e-commerce) y proyectos a medida.

### Marketing digital
Investigación, Google Ads, Meta Ads y contenido visual.

### Infraestructura cloud
Storage, bases de datos, VPS y soporte para proveedores cloud.

### IA y automatizaciones
Procesos con o sin IA, infraestructura local y atención al cliente.

Los productos propios son **Plata Studio** y **MarketDeck**. La oferta y la dirección visual vigentes están documentadas en [DESIGN-2026.md](DESIGN-2026.md).

─────────────────────────────────────────────



## 🚀 Cómo levantar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/ColoniaCloud/ColoniaCloud.git

# Instalar dependencias
npm install

# Configurar variables de entorno (ver .env.example)
cp .env.example .env.local

# Levantar en modo desarrollo
npm run dev
```

El formulario de contacto envía los mensajes por [Resend](https://resend.com); necesitás definir `RESEND_API_KEY` en `.env.local` para que funcione en local.

### Payload CMS y blog

El panel editorial está en `/admin`. En el primer acceso, creá el usuario administrador; luego gestioná artículos y sus imágenes desde el panel. Los artículos se publican en `/blog` y `/blog/[slug]`.

Cada artículo tiene una pestaña **SEO** (`@payloadcms/plugin-seo`) con título y descripción para buscadores, contador de caracteres, vista previa del resultado de Google, imagen para redes y un check `noindex`. Los dos campos de texto tienen botón de autogenerado a partir del título y el excerpt, así que un artículo sin trabajo de SEO igual sale con algo razonable; lo que se escriba a mano pisa el autogenerado. Marcar `noindex` saca la URL del sitemap y agrega `robots: noindex, follow` sin despublicar el artículo.

El listado y las fichas usan ISR con `revalidate = 300`, y los hooks `afterChange` de la colección llaman a `revalidatePath` al guardar. Con el CDN de Hostinger de por medio, un cambio puede tardar hasta un par de horas en verse; si urge, purgar la caché del sitio.

Payload usa SQLite y guarda la base y los archivos en `PAYLOAD_DATA_DIR` (por defecto `./data`). En Hostinger, configurá `PAYLOAD_SECRET` y apuntá `PAYLOAD_DATA_DIR` a una **ruta absoluta fuera del directorio de la aplicación** (por ejemplo `/home/<usuario>/payload-data`): cada despliegue reemplaza el directorio de la app, así que una ruta relativa como `./data` se lleva puesta la base y las imágenes en cada push. Al arrancar en producción, la app escribe la ruta efectiva en los logs de ejecución (`[payload] PAYLOAD_DATA_DIR -> ...`) y avisa si quedó adentro de la app. Payload aplica las migraciones pendientes al inicializarse en producción; el script `start` también las ejecuta antes de levantar Next.js cuando la plataforma lo respeta. Hacé copias de seguridad periódicas de esa carpeta.

La aplicación requiere Node.js 20.9 o posterior; confirmá la versión seleccionada para el proceso Node.js en hPanel.

Para generar una clave local de Payload podés usar `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`; guardala en `.env.local` y en las variables privadas del proyecto en Hostinger, nunca en el repositorio.

El proyecto va a estar disponible en `http://localhost:3000`
