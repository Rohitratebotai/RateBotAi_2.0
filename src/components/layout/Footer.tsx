import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { company, footer } from '@/data/siteData';

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-navy-400 dark:text-navy-300">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-navy-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-canvas-line bg-canvas-subtle dark:border-navy-700 dark:bg-navy-950">
      <div className="container-px py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="RateBotAI home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                <span className="text-lg font-extrabold leading-none">R</span>
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight text-navy-900 dark:text-white">
                RateBot<span className="text-navy-400 dark:text-navy-300">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
              {company.description}
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary">
                <Mail size={16} className="mt-0.5 shrink-0 text-navy-400" />
                <a href={`mailto:${company.email}`} className="hover:text-navy-900 dark:hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-secondary">
                <Phone size={16} className="mt-0.5 shrink-0 text-navy-400" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-navy-900 dark:hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-secondary">
                <MapPin size={16} className="mt-0.5 shrink-0 text-navy-400" />
                <span>{company.address}</span>
              </li>
            </ul>
          </div>

          <Column title="Products" links={footer.products} />
          <Column title="Company" links={footer.company} />
          <Column title="Resources" links={footer.resources} />
          <Column title="Legal" links={footer.legal} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-canvas-line pt-8 dark:border-navy-700 sm:flex-row sm:items-center">
          <p className="text-sm text-tertiary">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {footer.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-tertiary transition-colors hover:text-navy-900 dark:hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
