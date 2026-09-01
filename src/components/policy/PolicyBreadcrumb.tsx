import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Props = {
  documentTitle: string;
};

export function PolicyBreadcrumb({ documentTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/"
        className="font-medium text-navy-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-white"
      >
        Home
      </Link>
      <ChevronRight size={15} className="text-tertiary" />
      <span className="font-semibold text-navy-900 dark:text-white">{documentTitle}</span>
    </nav>
  );
}
