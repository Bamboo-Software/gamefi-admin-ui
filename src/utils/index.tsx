import { ROLE_VISUALS } from '@/constants/user';
import { format } from 'date-fns';
import { User } from 'lucide-react';

export const formattedDate = (date?: string): string => {
  if (!date) return '';
  let formatted;
  try {
    formatted = format(new Date(date), 'yyyy-MM-dd');
  } catch {
    return '';
  }
  return formatted ?? '';
}


export const getRoleVisual = (role: string) => {
  return (
    ROLE_VISUALS[role] ?? {
      icon: <User className="w-4 h-4 text-muted" />,
      text: role,
      textColor: 'text-muted-foreground',
    }
  );
};

