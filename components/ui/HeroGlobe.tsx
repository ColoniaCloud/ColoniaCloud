'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import land from '@/lib/globe-land.json';

type Vector = [number, number, number];
const RAD = Math.PI / 180;
const COLONIA = [-34.4626, -57.8398] as const;
const TERRACOTTA = '189, 91, 55';

function sphere(lat: number, lon: number): Vector {
  return [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];
}

const origin = sphere(...COLONIA);
// Local, pre-sampled Natural Earth 1:110m land data (public domain).
// https://www.naturalearthdata.com/about/terms-of-use/
const dots = land.map(([lat, lon]) => sphere(lat, lon));
const destinations = [[-23.55, -46.63], [-33.45, -70.67], [4.71, -74.07], [19.43, -99.13], [40.71, -74.01], [38.72, -9.14], [40.42, -3.7], [6.52, 3.38]];
const routes = destinations.map(([lat, lon]) => {
  const end = sphere(lat, lon);
  const angle = Math.acos(Math.max(-1, Math.min(1, origin.reduce((sum, v, i) => sum + v * end[i], 0))));
  return Array.from({ length: 65 }, (_, i): Vector => {
    const t = i / 64;
    const a = Math.sin((1 - t) * angle) / Math.sin(angle);
    const b = Math.sin(t * angle) / Math.sin(angle);
    const lift = 1 + Math.sin(t * Math.PI) * .11;
    return origin.map((v, j) => (v * a + end[j] * b) * lift) as Vector;
  });
});

function wave(distance: number): Vector[] {
  const lat = COLONIA[0] * RAD;
  const lon = COLONIA[1] * RAD;
  return Array.from({ length: 129 }, (_, i) => {
    const bearing = i / 128 * Math.PI * 2;
    const p = Math.asin(Math.sin(lat) * Math.cos(distance) + Math.cos(lat) * Math.sin(distance) * Math.cos(bearing));
    const l = lon + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(lat), Math.cos(distance) - Math.sin(lat) * Math.sin(p));
    return sphere(p / RAD, l / RAD);
  });
}

const grid: Vector[][] = [];
for (let lat = -60; lat <= 60; lat += 30) {
  grid.push(Array.from({ length: 181 }, (_, i) => sphere(lat, i * 2 - 180)));
}
for (let lon = -180; lon < 180; lon += 30) {
  grid.push(Array.from({ length: 91 }, (_, i) => sphere(i * 2 - 90, lon)));
}

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = paused || reducedMotion;
    let frame = 0;
    let visible = true;
    let elapsed = elapsedRef.current;
    let previous = 0;
    let size = 0;

    const draw = () => {
      if (!size) return;
      const radius = size * .405;
      const cx = size * .5;
      const cy = size * .46;
      // Keep the Río de la Plata in view, with a subtle change of perspective.
      const longitude = (-40 + Math.sin(elapsed * .13) * 7) * RAD;
      const latitude = -12 * RAD;
      const project = ([x, y, z]: Vector) => {
        const east = x * Math.cos(longitude) - z * Math.sin(longitude);
        const front = x * Math.sin(longitude) + z * Math.cos(longitude);
        const north = y * Math.cos(latitude) - front * Math.sin(latitude);
        const depth = y * Math.sin(latitude) + front * Math.cos(latitude);
        return { x: cx + east * radius, y: cy - north * radius, z: depth };
      };
      const line = (points: Vector[], opacity: number, width = .7) => {
        ctx.beginPath();
        let connected = false;
        for (const point of points) {
          const p = project(point);
          if (p.z < .02) { connected = false; continue; }
          if (connected) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
          connected = true;
        }
        ctx.strokeStyle = `rgba(${TERRACOTTA}, ${opacity})`;
        ctx.lineWidth = width;
        ctx.stroke();
      };
      ctx.clearRect(0, 0, size, size);
      const surface = ctx.createRadialGradient(cx - radius * .4, cy - radius * .4, 0, cx, cy, radius);
      surface.addColorStop(0, 'rgba(255, 237, 218, .18)');
      surface.addColorStop(.8, 'rgba(226, 154, 108, .08)');
      surface.addColorStop(1, 'rgba(189, 91, 55, .14)');
      ctx.fillStyle = surface;
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${TERRACOTTA}, .2)`;
      ctx.lineWidth = .8; ctx.stroke();
      for (const meridian of grid) line(meridian, .1);

      for (const point of dots) {
        const p = project(point);
        if (p.z < 0) continue;
        ctx.fillStyle = `rgba(${TERRACOTTA}, ${.3 + p.z * .6})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.7, size * .0025) * (.65 + p.z * .35), 0, Math.PI * 2); ctx.fill();
      }
      routes.forEach((route, index) => {
        line(route, .22, 1);
        const end = project(route[64]);
        if (end.z > 0) {
          ctx.fillStyle = `rgba(${TERRACOTTA}, .8)`;
          ctx.beginPath(); ctx.arc(end.x, end.y, 2.4, 0, Math.PI * 2); ctx.fill();
        }
        if (!still) {
          const progress = ((elapsed * .2 + index * .11) % 1);
          const head = Math.floor(progress * 64);
          line(route.slice(Math.max(0, head - 7), head + 1), .85, 1.8);
        }
      });
      for (let i = 0; i < 3; i++) {
        const progress = (elapsed * .13 + i / 3) % 1;
        line(wave(progress * Math.PI), (1 - progress) * .35, 1.1);
      }
      const pin = project(origin);
      ctx.fillStyle = `rgb(${TERRACOTTA})`;
      ctx.beginPath(); ctx.arc(pin.x, pin.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${TERRACOTTA}, .4)`;
      ctx.beginPath(); ctx.arc(pin.x, pin.y, 8, 0, Math.PI * 2); ctx.stroke();
      // Connect the geographic origin to a legible label below the globe.
      const labelY = size * .91;
      ctx.beginPath(); ctx.moveTo(pin.x, pin.y + 10); ctx.lineTo(pin.x, labelY - 24); ctx.lineTo(cx, labelY - 24); ctx.lineTo(cx, labelY - 12);
      ctx.strokeStyle = `rgba(${TERRACOTTA}, .45)`; ctx.lineWidth = .8; ctx.stroke();
      if (labelRef.current) labelRef.current.style.top = `${labelY}px`;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { previous = 0; return; }
      if (previous) elapsed += Math.min((now - previous) / 1000, .1);
      elapsedRef.current = elapsed;
      previous = now;
      draw();
      if (!still) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      size = canvas.getBoundingClientRect().width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); previous = 0; }
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', start);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', start);
    };
  }, [paused, reducedMotion]);

  return (
    <div className="hero-globe">
      <canvas ref={canvasRef} role="img" aria-label="Globo terráqueo terracota con una red de conexiones y pulsos que parten de Colonia del Sacramento, Uruguay." />
      <div className="hero-globe-label" ref={labelRef}>
        <span className="hero-globe-origin" aria-hidden="true" />
        <span>Colonia del Sacramento<small>Uruguay · Desde acá, al mundo.</small></span>
      </div>
      {!reducedMotion && <button className="hero-globe-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reanudar animación del globo' : 'Pausar animación del globo'}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>}
    </div>
  );
}
