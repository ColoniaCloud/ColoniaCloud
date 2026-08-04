import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage:
            'linear-gradient(to bottom, #000000 0%, #000000 65%, #0D0D0D 100%)',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}
        >
          Colonia Cloud
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Llevamos tu negocio a la nube
        </div>
      </div>
    ),
    size
  );
}
