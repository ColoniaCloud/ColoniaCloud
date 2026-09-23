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
          backgroundColor: '#11131d',
          backgroundImage:
            'radial-gradient(circle at 52% 110%, #a4533c 0%, #442b38 39%, #111b35 88%)',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: '#fff7f0',
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
          Diseño y tecnología desde Colonia
        </div>
      </div>
    ),
    size
  );
}
