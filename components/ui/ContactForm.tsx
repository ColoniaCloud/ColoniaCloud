'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CircleAlert } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/brand-icons';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormData = z.infer<typeof schema>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const baseInputClass = [
  'w-full rounded-md text-[14px] text-cc-text bg-cc-bg',
  'px-3 py-[9px]',
  'border border-black/[0.11]',
  'focus:outline-none focus:border-cc-accent',
  'focus:shadow-[0_0_0_3px_rgba(0,0,0,0.15)]',
  'placeholder:text-cc-muted',
  'transition-all duration-150',
].join(' ');

const errorInputClass = [
  'w-full rounded-md text-[14px] text-cc-text bg-cc-bg',
  'px-3 py-[9px]',
  'border border-red-500',
  'focus:outline-none focus:border-red-500',
  'focus:shadow-[0_0_0_3px_rgba(192,57,43,0.12)]',
  'placeholder:text-cc-muted',
  'transition-all duration-150',
].join(' ');

interface ContactFormProps {
  withWhatsApp?: boolean;
  showHeading?: boolean;
}

export default function ContactForm({ withWhatsApp = false, showHeading = true }: ContactFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('send_failed');

      setStatus('success');
      router.push('/gracias');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {showHeading && (
        <div>
          <h3 className="font-display font-medium text-[1.125rem] text-cc-text mb-1">
            O dejanos tu mensaje
          </h3>
          <p className="text-[13px] text-cc-text-body mb-4">
            Te respondemos por email o WhatsApp.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-[#FCECEA] border border-[#F0AAAA] rounded-md p-3 flex items-center gap-2">
          <CircleAlert size={16} className="text-red-600 flex-shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-red-700">
            Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-[13px] font-medium text-cc-text-label">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className={errors.nombre ? errorInputClass : baseInputClass}
            {...register('nombre')}
          />
          {errors.nombre && (
            <p className="text-[12px] text-red-500 mt-0.5">{errors.nombre.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[13px] font-medium text-cc-text-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className={errors.email ? errorInputClass : baseInputClass}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-[12px] text-red-500 mt-0.5">{errors.email.message}</p>
          )}
        </div>

        {/* Mensaje */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="mensaje" className="text-[13px] font-medium text-cc-text-label">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={4}
            placeholder="Contanos en qué podemos ayudarte..."
            className={`${errors.mensaje ? errorInputClass : baseInputClass} resize-none`}
            {...register('mensaje')}
          />
          {errors.mensaje && (
            <p className="text-[12px] text-red-500 mt-0.5">{errors.mensaje.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full gap-2"
        >
          {status === 'loading' ? (
            <>
              <div
                className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                aria-hidden="true"
              />
              Enviando...
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Enviar mensaje
            </>
          )}
        </Button>

        {withWhatsApp && (
          <a
            href="https://wa.me/59896082266"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[13px] font-medium text-cc-accent hover:underline"
          >
            <WhatsAppIcon size={16} aria-hidden="true" />
            O escribinos por WhatsApp
          </a>
        )}
      </form>
    </div>
  );
}
