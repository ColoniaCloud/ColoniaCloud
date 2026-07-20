'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, MessageCircle } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import ContactForm from '@/components/ui/ContactForm';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  triggerLabel?: string;
  triggerVariant?: ButtonProps['variant'];
  triggerClassName?: string;
}

export default function ContactModal({
  triggerLabel = 'Contacto',
  triggerVariant = 'primary',
  triggerClassName,
}: ContactModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant={triggerVariant}
          size="lg"
          className={cn('gap-2', triggerClassName)}
        >
          <MessageCircle size={18} aria-hidden="true" />
          {triggerLabel}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-cc-bg p-6 shadow-xl focus:outline-none data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out max-h-[85vh] overflow-y-auto"
        >
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute right-4 top-4 text-cc-text-body hover:text-cc-text transition-colors duration-150"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </Dialog.Close>

          <Dialog.Title className="font-display font-medium text-[1.375rem] text-cc-text mb-1">
            Hablemos
          </Dialog.Title>
          <Dialog.Description className="text-[13px] text-cc-text-body mb-5">
            Contanos qué necesitás. Respondemos en menos de 24 horas.
          </Dialog.Description>

          <ContactForm withWhatsApp showHeading={false} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
