import type { LucideIcon } from 'lucide-react';

type Props = { badge: string; title: string; description: string; icon?: LucideIcon };

export default function InternalHero({ badge, title, description }: Props) {
  return <section className="inner-hero"><div className="site-container"><span className="eyebrow">Colonia Cloud / {badge}</span><h1 className="display">{title}</h1><p>{description}</p></div></section>;
}
