import {
  IconToolsKitchen2,
  IconBuildingStore,
  IconBriefcase,
  IconBuildingBank,
  IconRocket,
} from '@tabler/icons-react';

const sectors = [
  { icon: IconToolsKitchen2, label: 'Restaurantes y bares' },
  { icon: IconBuildingStore, label: 'Comercios' },
  { icon: IconBriefcase, label: 'Profesionales' },
  { icon: IconBuildingBank, label: 'Instituciones' },
  { icon: IconRocket, label: 'Emprendedores' },
];

export default function TrustBarSection() {
  return (
    <section className="bg-cc-bg border-y border-black/[0.06] py-5">
      <div className="max-w-[1280px] mx-auto px-7">
        <p className="text-[11px] uppercase tracking-wider text-cc-muted text-center mb-4">
          Trabajamos con
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10 list-none">
          {sectors.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-cc-accent" aria-hidden="true" />
              <span className="text-[13px] text-cc-text-body">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
