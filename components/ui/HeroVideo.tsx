'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';

const BAR_DELAYS = [240, 80, 400, 160, 320, 0, 440, 200, 360, 120, 280, 40];

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    const hero = media?.closest<HTMLElement>('.hero');
    if (!media || !video || !hero) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const bars = Array.from(media.querySelectorAll<HTMLElement>('.hero-glass-track'));
    let frame = 0;
    let entered = 0;
    let complete = false;

    const update = () => {
      frame = 0;
      if (motion.matches || hero.dataset.parallax !== 'true') return;
      const distance = Math.max(1, hero.offsetHeight - media.offsetHeight);
      const scroll = Math.max(0, -hero.getBoundingClientRect().top);
      media.style.transform = `translate3d(0, ${Math.min(scroll, distance)}px, 0)`;
      const progress = complete ? Math.min(1, scroll / (distance * .88)) : 0;
      bars.forEach((bar, index) => {
        // Las hojas interiores se apartan primero, y empujan la persiana hacia los bordes.
        const centerDistance = Math.abs(index - (bars.length - 1) / 2);
        const delay = centerDistance * .025;
        const local = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const eased = local * local * (3 - 2 * local);
        const direction = index < bars.length / 2 ? -1 : 1;
        bar.style.transform = `translate3d(${direction * eased * (bars.length / 2 + 1) * 100}%, 0, 0)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const startEntrance = () => {
      if (motion.matches || video.readyState < 2 || document.documentElement.classList.contains('intro-activa')) return;
      media.dataset.ready = 'true';
    };
    const syncMotion = () => {
      hero.dataset.parallax = String(!motion.matches);
      if (motion.matches) {
        media.style.transform = '';
        delete media.dataset.ready;
        entered = 0;
        complete = false;
        bars.forEach(bar => { bar.style.transform = ''; });
      } else {
        startEntrance();
        schedule();
      }
    };
    const finishEntrance = (event: AnimationEvent) => {
      if (event.animationName !== 'hero-glass-in') return;
      entered += 1;
      if (entered === bars.length) {
        complete = true;
        schedule();
      }
    };
    const onError = () => {
      hero.dataset.parallax = 'false';
      delete media.dataset.ready;
      media.style.transform = '';
    };
    // La intro de marca puede tapar el video: esperar su salida antes de entrar.
    const intro = new MutationObserver(startEntrance);
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const resize = new ResizeObserver(schedule);
    resize.observe(hero);
    resize.observe(media);
    syncMotion();
    video.addEventListener('loadeddata', startEntrance);
    video.addEventListener('error', onError);
    media.addEventListener('animationend', finishEntrance);
    motion.addEventListener('change', syncMotion);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      intro.disconnect();
      resize.disconnect();
      video.removeEventListener('loadeddata', startEntrance);
      video.removeEventListener('error', onError);
      media.removeEventListener('animationend', finishEntrance);
      motion.removeEventListener('change', syncMotion);
      window.removeEventListener('scroll', schedule);
      delete hero.dataset.parallax;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (!reducedMotion.matches) {
        if (!video.getAttribute('src')) video.src = '/drone.mp4';
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    syncPlayback();
    reducedMotion.addEventListener('change', syncPlayback);
    return () => {
      video.pause();
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (!video.getAttribute('src')) video.src = '/drone.mp4';
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }

  return (
    <div className="hero-media" ref={mediaRef}>
      <video
        ref={videoRef}
        className="hero-video"
        muted
        loop
        playsInline
        preload="none"
        poster="/atardecer colonia.webp"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="hero-glass" aria-hidden="true">
        {BAR_DELAYS.map((delay, index) => (
          <div className="hero-glass-track" key={index}>
            <div className="hero-glass-bar" style={{ '--glass-delay': `${delay}ms` } as CSSProperties} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="hero-video-toggle"
        onClick={togglePlayback}
        aria-label={playing ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
