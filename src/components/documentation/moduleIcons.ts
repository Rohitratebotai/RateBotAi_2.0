import { Building2, CalendarCheck, LayoutDashboard, Tags, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Tags,
};

export function getModuleIcon(name: string): LucideIcon {
  return iconMap[name] ?? LayoutDashboard;
}
