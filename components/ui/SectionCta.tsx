import { ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/contact';

type Props = { title: string; description: string; message?: string };

export default function SectionCta({ title, description, message }: Props) {
  return <div className="service-cta-box"><div><h2>{title}</h2><p>{description}</p></div><a className="btn-primary" href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">Conversemos <ArrowUpRight size={17} aria-hidden="true" /></a></div>;
}
