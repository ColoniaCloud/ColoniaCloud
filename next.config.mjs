/** @type {import('next').NextConfig} */
const nextConfig = {
  // Con `revalidate` en el layout Next emite `s-maxage=3600` y agrega
  // `stale-while-revalidate` hasta este tope. Sin fijarlo, el tope es un año
  // y el CDN podría seguir sirviendo HTML viejo mientras revalida. Con 7200,
  // lo más viejo que puede llegar a Google son dos horas.
  expireTime: 7200,

  // www → apex con 301. Hostinger sirve los dos hosts con el mismo contenido
  // y solo el canonical los unificaba; el redirect es la señal fuerte y evita
  // que Google rastree el sitio dos veces.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.colonia.cloud' }],
        destination: 'https://colonia.cloud/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
