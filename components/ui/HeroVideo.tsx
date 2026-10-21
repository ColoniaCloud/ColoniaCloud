'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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
    <div className="hero-media">
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
