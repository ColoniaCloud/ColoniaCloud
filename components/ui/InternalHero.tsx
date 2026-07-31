import type { LucideIcon } from 'lucide-react';

type Props = {
  badge: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export default function InternalHero({ badge, title, description, icon: Icon }: Props) {
  return (
    <section className="bg-cc-bg border-b border-black/[0.06] pt-[110px] md:pt-[130px] pb-[48px]">
      <div className="max-w-[1280px] mx-auto px-7 flex flex-col items-center text-center gap-4">
        {Icon && (
          <div className="w-14 h-14 bg-cc-accent-light rounded-xl flex items-center justify-center">
            <Icon size={28} strokeWidth={1.5} className="text-cc-accent" aria-hidden="true" />
          </div>
        )}
        <span className="inline-flex items-center gap-1.5 bg-cc-accent-light text-cc-accent rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
          {badge}
        </span>
        <h1 className="font-display font-medium text-[1.75rem] md:text-[2.2rem] text-cc-text leading-[1.2]">
          {title}
        </h1>
        <p className="text-[15px] text-cc-text-body max-w-[480px] leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
