'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import {
  MessageCircle,
  FileText,
  Code,
  LifeBuoy,
} from 'lucide-react';

import { WhatsAppIcon } from '@/components/ui/brand-icons';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Auditoría',
    tag: 'Gratis',
    description:
      'Analizamos tu negocio y objetivos en una charla por WhatsApp, sin formularios largos. Esta auditoría inicial no tiene costo ni compromiso.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Propuesta',
    tag: 'Gratis',
    description:
      'Te enviamos una propuesta clara con alcance, tiempos y precio. Sin letra chica y sin cargo por armarla.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Desarrollo',
    tag: null,
    description:
      'Trabajamos con revisiones en cada etapa. Vos aprobás antes de avanzar al siguiente paso.',
  },
  {
    number: '04',
    icon: LifeBuoy,
    title: 'Soporte',
    tag: null,
    description:
      'Entregamos y te acompañamos. 30 días de garantía y soporte continuo disponible.',
  },
];

const titleLines = ['Simple,', 'claro', 'y sin sorpresas'];

const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProcesoSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="bg-cc-bg py-[64px] md:py-[96px]">
      <div className="max-w-[1280px] mx-auto px-7">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {/* Columna 1 — Imagen de fondo + título animado */}
          <div className="relative flex min-h-[420px] flex-col justify-center overflow-hidden rounded-xl px-8 py-12 md:min-h-[560px] md:px-10">
            <Image
              src="/fotos/atardecer.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                Cómo trabajamos
              </span>

              <motion.h2
                id="proceso-titulo"
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={titleContainer}
                className="font-display font-medium text-[2.25rem] leading-[1.15] text-white sm:text-[2.5rem]"
              >
                {titleLines.map((line, lineIdx) => (
                  <span key={line} className="block">
                    {line.split(' ').map((w, i, arr) => (
                      <motion.span
                        key={`${lineIdx}-${w}`}
                        variants={wordVariants}
                        className="inline-block"
                      >
                        {w}
                        {i < arr.length - 1 ? ' ' : ''}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h2>

              <p className="mt-5 max-w-[360px] text-[16px] leading-relaxed text-white/80">
                Cuatro pasos para llevar tu proyecto de una idea a la entrega
                final de una herramienta eficiente.
              </p>
            </div>
          </div>

          {/* Columna 2 — Los cuatro pasos, apilados verticalmente */}
          <div className="flex flex-col justify-center">
            {steps.map(({ number, icon: Icon, title, tag, description }, idx) => (
              <div key={number} className="relative flex gap-5 pb-10 last:pb-0">
                {idx < steps.length - 1 && (
                  <span
                    className="absolute left-[21px] top-11 bottom-0 w-px bg-black/10"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-cc-warm-light">
                  <Icon size={20} className="text-cc-warm-deep" aria-hidden="true" />
                </div>

                <div className="pt-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-display font-medium text-cc-warm/80">
                      {number}
                    </span>
                    <h3 className="font-display font-medium text-[1.0625rem] text-cc-text">
                      {title}
                    </h3>
                    {tag && (
                      <span className="rounded-full bg-cc-warm-light px-2 py-0.5 text-[11px] font-medium text-cc-warm-deep">
                        {tag}
                      </span>
                    )}
                  </div>
                  <p className="max-w-[420px] text-[14px] leading-relaxed text-cc-text-body">
                    {description}
                  </p>
                </div>
              </div>
            ))}

            {/* Cierre de la escalera. El visitante acaba de leer que el
                primer paso es gratis y sin compromiso: el botón tiene que
                estar acá, no cinco secciones más abajo. */}
            <div className="mt-2 flex flex-col items-start gap-4 rounded-xl bg-cc-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] leading-relaxed text-cc-text-label">
                El primer paso no te cuesta nada. Contanos qué necesitás y
                arrancamos por la auditoría.
              </p>

              <a
                href="https://wa.me/59896082266"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-cc-accent px-5 py-3 text-[14px] font-medium text-white transition-colors duration-150 hover:bg-cc-accent-hover"
              >
                <WhatsAppIcon size={16} aria-hidden="true" />
                Empezar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
