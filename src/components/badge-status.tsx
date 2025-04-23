import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  active: boolean;
}

export const StatusBadge = ({ active }: StatusBadgeProps) => {
  const badgeColor = active ? 'bg-green-500' : 'bg-gray-400';
  const statusText = active ? 'Active' : 'Inactive';
  const statusClass = active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';

  return (
    <Badge className={statusClass}>
      <span className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${badgeColor}`} />
        {statusText}
      </span>
    </Badge>
  );
};
