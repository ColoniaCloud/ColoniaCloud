import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

type Props = {
  title: string;
  description: string;
};

export default function SectionCta({ title, description }: Props) {
  return (
    <div className="bg-cc-accent-light rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="font-display font-medium text-[1.25rem] text-cc-text mb-1">
          {title}
        </h3>
        <p className="text-[14px] text-cc-text-body">{description}</p>
      </div>
      <Button
        variant="primary"
        asChild
      >
        <a
          href="https://wa.me/59800000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0"
        >
          <IconBrandWhatsapp size={17} aria-hidden="true" />
          Escribinos por WhatsApp
        </a>
      </Button>
    </div>
  );
}
