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
          backgroundColor: '#091828',
          backgroundImage:
            'radial-gradient(circle at 50% 118%, #F28C38 0%, #1E5F8C 34%, #091828 78%)',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: '#ECF3F9',
            letterSpacing: '-0.02em',
          }}
        >
          Colonia Cloud
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: 'rgba(236,243,249,0.78)',
          }}
        >
          Diseño y tecnología desde Colonia
        </div>
      </div>
    ),
    size
  );
}
