import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Props = {
  moduleTitle?: string;
};

export function DocumentationBreadcrumb({ moduleTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/documentation"
        className="font-medium text-navy-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-white"
      >
        Documentation
      </Link>
      {moduleTitle && (
        <>
          <ChevronRight size={15} className="text-tertiary" />
          <span className="font-semibold text-navy-900 dark:text-white">{moduleTitle}</span>
        </>
      )}
    </nav>
  );
}
