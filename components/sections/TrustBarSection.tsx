import {
  GoogleCloudIcon,
  MysqlIcon,
  RedhatIcon,
  AnthropicIcon,
  AntelIcon,
} from '@/components/ui/brand-icons';

const certifications = [
  { icon: GoogleCloudIcon, label: 'Google Cloud' },
  { icon: MysqlIcon, label: 'MySQL' },
  { icon: RedhatIcon, label: 'Red Hat' },
  { icon: AnthropicIcon, label: 'Anthropic' },
  { icon: AntelIcon, label: 'Antel' },
];

export default function TrustBarSection() {
  return (
    <section className="bg-black py-6" data-navbar-theme="dark">
      <div className="max-w-[1280px] mx-auto px-7 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-8 gap-y-3">
        <p className="text-[11px] uppercase tracking-wider text-white/50 whitespace-nowrap">
          Certificados en:
        </p>

        <ul className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-8 gap-y-3 list-none">
          {certifications.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center">
              <Icon
                size={22}
                className="text-white/70 hover:text-white transition-colors duration-150"
                aria-label={label}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
