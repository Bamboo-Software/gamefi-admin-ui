import { SOCIAL_TASK_TYPE_VISUALS, TASK_TYPE_VISUALS } from '@/constants/tasks';
import { ROLE_VISUALS } from '@/constants/user';
import { SocialTaskTypeEnum, TaskTypeEnum } from '@/enums/task.enums';
import { RoleTypeEnum } from '@/enums/user.enums';
import { format } from 'date-fns';
import { Rss, User } from 'lucide-react';

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

export const getStatusColor = (active: boolean): string =>
  active
    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

export const getRoleVisual = (role: RoleTypeEnum) => {
    if (role in ROLE_VISUALS) {
      return ROLE_VISUALS[role as RoleTypeEnum];
    }
    return {
      icon: <User className="w-4 h-4 text-muted" />,
      text: role,
      textColor: 'text-muted-foreground',
    };
};
export const getTypeVisual = (type: TaskTypeEnum) => {
  if (type in TASK_TYPE_VISUALS) {
    return TASK_TYPE_VISUALS[type as TaskTypeEnum];
  }
  return {
    icon: <User className="w-4 h-4 text-muted" />,
    text: type,
    textColor: 'text-muted-foreground',
  };
};
export const getSocialTypeVisual = (type: SocialTaskTypeEnum) => {
  if (type in SOCIAL_TASK_TYPE_VISUALS) {
    return SOCIAL_TASK_TYPE_VISUALS[type as SocialTaskTypeEnum];
  }
  return {
    icon:<Rss className="w-4 h-4 text-muted" />,
    text: type,
    textColor: 'text-muted-foreground',
  };
};
export const getFrequencyTypeVisual = (type: SocialTaskTypeEnum) => {
  if (type in SOCIAL_TASK_TYPE_VISUALS) {
    return SOCIAL_TASK_TYPE_VISUALS[type as SocialTaskTypeEnum];
  }
  return {
    icon:<Rss className="w-4 h-4 text-muted" />,
    text: type,
    textColor: 'text-muted-foreground',
  };
};

