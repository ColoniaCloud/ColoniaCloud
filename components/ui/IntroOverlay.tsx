'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const FRASE = 'Hecho en Colonia, pensado para ir más allá';

/** Milisegundos entre letra y letra. */
const PASO_LETRA = 16;

/** Lo que tarda cada letra en entrar. Igual que en el CSS. */
const DURA_LETRA = 340;

/* La coreografía, en milisegundos desde que arranca. Se calcula a partir del
   largo de la frase para que al cambiarla los tiempos sigan cuadrando: la
   última letra tiene que haber terminado antes de que el logo se vaya. */
const EMPIEZAN_LETRAS = 360;
const TERMINAN_LETRAS = EMPIEZAN_LETRAS + (FRASE.length - 1) * PASO_LETRA + DURA_LETRA;
const T = {
  letras: EMPIEZAN_LETRAS,
  // La frase entera quieta antes de que el logo se vaya. Estuvo en 260ms y
  // era demasiado poco: no se leía como una pausa sino como que la frase
  // seguía de largo. Abajo de medio segundo no registra como un alto.
  vuela: TERMINAN_LETRAS + 640,
  // Ventanas de 380ms para el vuelo y 500ms para el círculo. Tienen que
  // coincidir con las duraciones del CSS: si acá fueran más cortas, la fase
  // cambiaría antes de que la animación anterior termine.
  abre: TERMINAN_LETRAS + 1020,
  fin: TERMINAN_LETRAS + 1520,
};

/* Se parte en palabras y recién adentro en letras. Partiendo solo en letras,
   cada una es una caja independiente y el navegador corta el renglón donde
   quiere: la frase salía con "pensado pa / ra ir más allá". */
const PALABRAS = FRASE.split(' ').map((palabra, i, todas) => ({
  palabra,
  ultima: i === todas.length - 1,
}));

type Fase = 'entrando' | 'volando' | 'abriendo' | 'fuera';

export default function IntroOverlay() {
  // Arranca apagada: si el navegador no corre JavaScript, o si alguien pidió
  // menos movimiento, el sitio se ve directamente y esto nunca se monta.
  const [fase, setFase] = useState<Fase | null>(null);
  const [estilo, setEstilo] = useState<CSSProperties>({});
  const logoRef = useRef<HTMLDivElement>(null);
  const relojes = useRef<number[]>([]);

  const terminar = useCallback(() => {
    relojes.current.forEach(clearTimeout);
    relojes.current = [];
    setFase('fuera');
    document.documentElement.classList.remove('intro-activa', 'intro-revelando');
  }, []);

  useEffect(() => {
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Una sola vez por pestaña: al navegar entre páginas o al volver atrás, el
    // telón no se repite. Una intro que aparece en cada carga cansa.
    const yaVista = sessionStorage.getItem('cc-intro') === 'vista';
    if (menosMovimiento || yaVista) return;

    sessionStorage.setItem('cc-intro', 'vista');
    document.documentElement.classList.add('intro-activa');
    setFase('entrando');

    relojes.current = [
      window.setTimeout(() => {
        // FLIP: la diferencia entre donde está el logo ahora (centrado) y el
        // hueco que le guarda el header. Al animar hasta esa diferencia
        // aterriza exactamente encima del logo real, sin números a mano.
        const logo = logoRef.current;
        const destino = document.querySelector('.site-logo img');
        if (logo && destino) {
          const a = logo.getBoundingClientRect();
          const b = destino.getBoundingClientRect();
          setEstilo({
            '--cc-intro-dx': `${b.left + b.width / 2 - (a.left + a.width / 2)}px`,
            '--cc-intro-dy': `${b.top + b.height / 2 - (a.top + a.height / 2)}px`,
            '--cc-intro-escala': `${b.width / a.width}`,
            // El círculo se abre desde donde aterrizó el logo, no desde el
            // centro de la pantalla: el gesto queda encadenado.
            '--cc-intro-x': `${b.left + b.width / 2}px`,
            '--cc-intro-y': `${b.top + b.height / 2}px`,
          } as CSSProperties);
        }
        setFase('volando');
      }, T.vuela),
      window.setTimeout(() => {
        // El logo del telón ya aterrizó exactamente encima del real, así que
        // acá se enciende el real: cuando el círculo se coma al del telón,
        // abajo hay otro idéntico y en el mismo lugar. Sin esto, el logo se
        // ve partirse mientras la máscara lo atraviesa.
        document.documentElement.classList.add('intro-revelando');
        setFase('abriendo');
      }, T.abre),
      window.setTimeout(terminar, T.fin),
    ];

    return () => {
      relojes.current.forEach(clearTimeout);
      document.documentElement.classList.remove('intro-activa', 'intro-revelando');
    };
  }, [terminar]);

  if (fase === null || fase === 'fuera') return null;

  let n = 0;

  return (
    /* Decorativa de punta a punta: el logo y la frase ya están en el header y
       en el hero, así que para un lector de pantalla esto no existe. Un clic o
       una tecla la saltan, que es la salida para quien no quiera esperar. */
    <div
      className={`intro intro-${fase}`}
      style={estilo}
      aria-hidden="true"
      onClick={terminar}
      onKeyDown={terminar}
    >
      <div className="intro-escena">
        <div className="intro-logo" ref={logoRef}>
          <Image src="/brand/logo.svg" alt="" width={147} height={32} priority />
        </div>
        <p className="intro-frase">
          {PALABRAS.map(({ palabra, ultima }, p) => (
            <span className="intro-palabra" key={`${palabra}-${p}`}>
              {palabra.split('').map((letra, i) => (
                <span key={`${letra}-${i}`} style={{ '--cc-d': `${T.letras + n++ * PASO_LETRA}ms` } as CSSProperties}>
                  {letra}
                </span>
              ))}
              {!ultima && (
                <span style={{ '--cc-d': `${T.letras + n++ * PASO_LETRA}ms` } as CSSProperties}>&nbsp;</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
