import { documentationModules } from '@/data/documentationData';
import { ModuleCard } from './ModuleCard';

export function ModuleGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {documentationModules.map((mod, i) => (
        <ModuleCard key={mod.id} module={mod} index={i} />
      ))}
    </div>
  );
}
