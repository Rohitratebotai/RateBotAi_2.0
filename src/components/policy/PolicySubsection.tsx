import { type PolicySubsection } from '@/data/policyData';

type Props = {
  subsection: PolicySubsection;
};

export function PolicySubsection({ subsection }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold tracking-tight text-navy-800 dark:text-navy-100">
        {subsection.title}
      </h3>

      {subsection.paragraphs && subsection.paragraphs.length > 0 && (
        <div className="mt-3 space-y-3">
          {subsection.paragraphs.map((para, i) => (
            <p key={i} className="text-[0.95rem] leading-[1.75] text-secondary">
              {para}
            </p>
          ))}
        </div>
      )}

      {subsection.bulletPoints && subsection.bulletPoints.length > 0 && (
        <ul className="mt-3 space-y-2">
          {subsection.bulletPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-[1.7] text-secondary">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400 dark:bg-navy-500" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {subsection.numberedPoints && subsection.numberedPoints.length > 0 && (
        <ol className="mt-3 space-y-2">
          {subsection.numberedPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-[1.7] text-secondary">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-2xs font-bold text-white dark:bg-white dark:text-navy-900">
                {i + 1}
              </span>
              <span className="pt-0.5">{point}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
