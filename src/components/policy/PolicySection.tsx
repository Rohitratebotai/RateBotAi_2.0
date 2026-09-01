import { type PolicySection } from '@/data/policyData';
import { PolicySubsection } from './PolicySubsection';

type Props = {
  section: PolicySection;
};

export function PolicySection({ section }: Props) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-b border-canvas-line py-8 last:border-b-0 dark:border-navy-700 lg:scroll-mt-32"
    >
      <h2 className="text-xl font-bold tracking-tight text-navy-900 dark:text-white">
        {section.title}
      </h2>

      {section.paragraphs && section.paragraphs.length > 0 && (
        <div className="mt-4 space-y-3">
          {section.paragraphs.map((para, i) => (
            <p key={i} className="text-[0.95rem] leading-[1.75] text-secondary">
              {para}
            </p>
          ))}
        </div>
      )}

      {section.bulletPoints && section.bulletPoints.length > 0 && (
        <ul className="mt-4 space-y-2">
          {section.bulletPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-[1.7] text-secondary">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400 dark:bg-navy-500" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {section.numberedPoints && section.numberedPoints.length > 0 && (
        <ol className="mt-4 space-y-2">
          {section.numberedPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-[1.7] text-secondary">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-2xs font-bold text-white dark:bg-white dark:text-navy-900">
                {i + 1}
              </span>
              <span className="pt-0.5">{point}</span>
            </li>
          ))}
        </ol>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 space-y-6 border-l-2 border-canvas-line pl-5 dark:border-navy-700">
          {section.subsections.map((sub) => (
            <PolicySubsection key={sub.id} subsection={sub} />
          ))}
        </div>
      )}
    </section>
  );
}
