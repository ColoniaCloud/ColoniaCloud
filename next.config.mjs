/** @type {import('next').NextConfig} */
const nextConfig = {
  // Con `revalidate` en el layout Next emite `s-maxage=3600` y agrega
  // `stale-while-revalidate` hasta este tope. Sin fijarlo, el tope es un año
  // y el CDN podría seguir sirviendo HTML viejo mientras revalida. Con 7200,
  // lo más viejo que puede llegar a Google son dos horas.
  expireTime: 7200,

  async redirects() {
    return [
      { source: '/servicios/web-app', destination: '/servicios/diseno-web', permanent: true },
      { source: '/servicios/software', destination: '/servicios/ia-automatizaciones', permanent: true },
      { source: '/servicios/infraestructura-vps', destination: '/servicios/infraestructura-cloud', permanent: true },
      { source: '/servicios/asesoria', destination: '/servicios', permanent: true },
    ];
  },

  // El redirect www → apex NO va acá: el proxy de Hostinger reescribe el
  // `Location` absoluto que emite Next a una ruta relativa y deja a
  // www.colonia.cloud en bucle (307 → /). Está configurado en hPanel
  // (Redirects del sitio), que responde en el borde antes de llegar a Next.
};

export default nextConfig;
