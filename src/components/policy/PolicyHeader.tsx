import { Calendar } from 'lucide-react';
import { type PolicyDocument } from '@/data/policyData';

type Props = {
  document: PolicyDocument;
};

export function PolicyHeader({ document }: Props) {
  return (
    <div>
      <p className="eyebrow text-navy-400 dark:text-navy-300">{document.title}</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl lg:text-[2.75rem]">
        {document.title}
      </h1>
      {document.description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary">
          {document.description}
        </p>
      )}
      {document.lastUpdated && (
        <p className="mt-4 flex items-center gap-2 text-sm text-tertiary">
          <Calendar size={15} />
          Last Updated: {document.lastUpdated}
        </p>
      )}
    </div>
  );
}
