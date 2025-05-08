import { CellPropsTask } from '@/components/pages/tasks/task-cell';
import SocialTypeCol from '@/components/pages/tasks/task-social';
import TypeCol from '@/components/pages/tasks/task-type';
import { SocialTaskTypeEnum, TaskFrequencyEnum, TaskTypeEnum } from '@/enums/task.enums';
import { Users, Share2, Gamepad2, Rss, } from 'lucide-react';
import {  FileText, CheckSquare, Award, Repeat, Circle, Trash, MoreHorizontal } from 'lucide-react';
import { FaTasks } from 'react-icons/fa';
import {
  GlobeIcon,
} from 'lucide-react'
import YouTube from '@/components/icons/youtube';
import XformerlyTwitter from '@/components/icons/x';
import Facebook from '@/components/icons/facebook';
import Instagram from '@/components/icons/instagram';
import Telegram from '@/components/icons/telegram';
import TikTok from '@/components/icons/tiktok';
export const TASK_TYPE_VISUALS: Record<
TaskTypeEnum,
  {
    icon: React.ReactNode;
    text: string;
    color: string;
  }
> = {
  [TaskTypeEnum.SOCIAL]: {
    icon: <Users className="w-4 h-4 text-pink-500" />,
    text: 'Social Task',
    color: 'text-pink-600',
  },
  [TaskTypeEnum.REFERRAL]: {
    icon: <Share2 className="w-4 h-4 text-yellow-500" />,
    text: 'Referral Task',
    color: 'text-yellow-600',
  },
  [TaskTypeEnum.GAME]: {
    icon: <Gamepad2 className="w-4 h-4 text-indigo-500" />,
    text: 'Game Task',
    color: 'text-indigo-600',
  },
  [TaskTypeEnum.ACHIEVEMENT]: {
    icon: <Award className="w-4 h-4 text-emerald-500" />,
    text: 'Achievement',
    color: 'text-emerald-600',
  },
  [TaskTypeEnum.OTHER]: {
    icon: <MoreHorizontal className="w-4 h-4 text-gray-500" />,
    text: 'Other',
    color: 'text-gray-600',
  },
};
export const SOCIAL_TASK_TYPE_VISUALS: Record<
  SocialTaskTypeEnum,
  {
    icon: React.ReactNode;
    text: string;
    textColor: string;
  }
> = {
  [SocialTaskTypeEnum.YOUTUBE_SUBSCRIBE]: {
    icon: <YouTube className="w-4 h-4" />,
    text: 'YouTube Subscribe',
    textColor: 'text-red-500',
  },
  [SocialTaskTypeEnum.YOUTUBE_WATCH]: {
    icon: <YouTube className="w-4 h-4" />,
    text: 'YouTube Watch',
    textColor: 'text-red-500',
  },
  [SocialTaskTypeEnum.YOUTUBE_LIKE]: {
    icon: <YouTube className="w-4 h-4" />,
    text: 'YouTube Like',
    textColor: 'text-red-500',
  },
  [SocialTaskTypeEnum.YOUTUBE_COMMENT]: {
    icon: <YouTube className="w-4 h-4" />,
    text: 'YouTube Comment',
    textColor: 'text-red-500',
  },
  [SocialTaskTypeEnum.TIKTOK_WATCH]: {
    icon: <TikTok className="w-4 h-4" />,
    text: 'TikTok Watch',
    textColor: 'text-white',
  },
  [SocialTaskTypeEnum.TIKTOK_LIKE]: {
    icon: <TikTok className="w-4 h-4" />,
    text: 'TikTok Like',
    textColor: 'text-white',
  },
  [SocialTaskTypeEnum.TIKTOK_COMMENT]: {
    icon: <TikTok className="w-4 h-4" />,
    text: 'TikTok Comment',
    textColor: 'text-white',
  },
  [SocialTaskTypeEnum.TIKTOK_SHARE]: {
    icon: <TikTok className="w-4 h-4" />,
    text: 'TikTok Share',
    textColor: 'text-white',
  },
  [SocialTaskTypeEnum.X_FOLLOW]: {
    icon: <XformerlyTwitter className="w-4 h-4" />,
    text: 'X (Twitter) Follow',
    textColor: 'text-sky-500',
  },
  [SocialTaskTypeEnum.X_LIKE]: {
    icon: <XformerlyTwitter className="w-4 h-4" />,
    text: 'X (Twitter) Like',
    textColor: 'text-sky-500',
  },
  [SocialTaskTypeEnum.X_COMMENT]: {
    icon: <XformerlyTwitter className="w-4 h-4" />,
    text: 'X (Twitter) Comment',
    textColor: 'text-sky-500',
  },
  [SocialTaskTypeEnum.X_SHARE]: {
    icon: <XformerlyTwitter className="w-4 h-4" />,
    text: 'X (Twitter) Share',
    textColor: 'text-sky-500',
  },
  [SocialTaskTypeEnum.FACEBOOK_LIKE]: {
    icon: <Facebook className="w-4 h-4" />,
    text: 'Facebook Like',
    textColor: 'text-blue-600',
  },
  [SocialTaskTypeEnum.FACEBOOK_SHARE]: {
    icon: <Facebook className="w-4 h-4" />,
    text: 'Facebook Share',
    textColor: 'text-blue-600',
  },
  [SocialTaskTypeEnum.INSTAGRAM_FOLLOW]: {
    icon: <Instagram className="w-4 h-4" />,
    text: 'Instagram Follow',
    textColor: 'text-pink-500',
  },
  [SocialTaskTypeEnum.INSTAGRAM_LIKE]: {
    icon: <Instagram className="w-4 h-4" />,
    text: 'Instagram Like',
    textColor: 'text-pink-500',
  },
  [SocialTaskTypeEnum.INSTAGRAM_COMMENT]: {
    icon: <Instagram className="w-4 h-4" />,
    text: 'Instagram Comment',
    textColor: 'text-pink-500',
  },
  [SocialTaskTypeEnum.INSTAGRAM_SHARE]: {
    icon: <Instagram className="w-4 h-4" />,
    text: 'Instagram Share',
    textColor: 'text-pink-500',
  },
  [SocialTaskTypeEnum.TELEGRAM_JOIN]: {
    icon: <Telegram className="w-4 h-4" />,
    text: 'Telegram Join',
    textColor: 'text-blue-400',
  },
  [SocialTaskTypeEnum.VISIT_WEBSITE]: {
    icon: <GlobeIcon className="w-4 h-4" />,
    text: 'Visit Website',
    textColor: 'text-green-500',
  },
};

export const TABLE_HEADERS_TASK = [
  {
    columnKey: 'title',
    title: 'Task Title',
    icon: <FaTasks className="inline w-4 h-4 mr-1 text-purple-600" />,
  },
  {
    columnKey: 'description',
    title: 'Task Description',
    icon: <FileText className="inline w-4 h-4 mr-1 text-rose-500" />,
  },
  {
    columnKey: 'type',
    title: 'Task Type',
    icon: <CheckSquare className="inline w-4 h-4 mr-1 text-amber-600" />,
  },
  {
    columnKey: 'pointsReward',
    title: 'Points Reward',
    icon: <Award className="inline w-4 h-4 mr-1 text-yellow-500" />,
  },
  {
    columnKey: 'frequency',
    title: 'Frequency',
    icon: <Repeat className="inline w-4 h-4 mr-1 text-indigo-500" />,
  },
  {
    columnKey: 'socialTaskType',
    title: 'Social Task Type',
    icon: <Rss className="inline w-4 h-4 mr-1 text-indigo-500" />,
  },
  {
    columnKey: 'status',
    title: 'Task Status',
    icon: <Circle className="inline w-4 h-4 mr-1 text-green-600" />,
  },
  {
    columnKey: 'deletedAt',
    title: 'Deleted At',
    icon: <Trash className="inline w-4 h-4 mr-1 text-gray-500" />,
  },
  {
    columnKey: 'actions',
    title: 'Actions',
    icon: <MoreHorizontal className="inline w-4 h-4 mr-1 text-gray-500" />,
  },
];


export const TYPE_OPTIONS = [
  { value: TaskTypeEnum.SOCIAL, label: 'Social' },
  { value: TaskTypeEnum.REFERRAL, label: 'Referral' },
  { value: TaskTypeEnum.GAME, label: 'Game' },
  { value: TaskTypeEnum.ACHIEVEMENT, label: 'Achievement' },
  { value: TaskTypeEnum.OTHER, label: 'Other' },
];
export const FREQUENCY_OPTIONS = [
  { value: TaskFrequencyEnum.DAILY, label: 'daily' },
  { value: TaskFrequencyEnum.WEEKLY, label: 'weekly' },
  { value: TaskFrequencyEnum.MONTHLY, label: 'monthly' },
  { value: TaskFrequencyEnum.PERMANENT, label: 'permanent' },
];

export const SOCIAL_TYPE_OPTIONS = [
  { value: SocialTaskTypeEnum.YOUTUBE_SUBSCRIBE, label: 'Youtube Subscribe' },
  { value: SocialTaskTypeEnum.YOUTUBE_WATCH, label: 'Youtube Watch' },
  { value: SocialTaskTypeEnum.YOUTUBE_LIKE, label: 'Youtube Like' },
  { value: SocialTaskTypeEnum.YOUTUBE_COMMENT, label: 'Youtube Comment' },
  { value: SocialTaskTypeEnum.TIKTOK_WATCH, label: 'Tiktok Watch' },
  { value: SocialTaskTypeEnum.TIKTOK_LIKE, label: 'Tiktok Like' },
  { value: SocialTaskTypeEnum.TIKTOK_COMMENT, label: 'Tiktok Comment' },
  { value: SocialTaskTypeEnum.TIKTOK_SHARE, label: 'Tiktok Share' },
  { value: SocialTaskTypeEnum.X_FOLLOW, label: 'X Follow' },
  { value: SocialTaskTypeEnum.X_LIKE, label: 'X Like' },
  { value: SocialTaskTypeEnum.X_COMMENT, label: 'X Comment' },
  { value: SocialTaskTypeEnum.X_SHARE, label: 'X Share' },
  { value: SocialTaskTypeEnum.FACEBOOK_LIKE, label: 'Facebook Like' },
  { value: SocialTaskTypeEnum.FACEBOOK_SHARE, label: 'Facebook Share' },
  { value: SocialTaskTypeEnum.INSTAGRAM_FOLLOW, label: 'Instagram Follow' },
  { value: SocialTaskTypeEnum.INSTAGRAM_LIKE, label: 'Instagram Like' },
  { value: SocialTaskTypeEnum.INSTAGRAM_COMMENT, label: 'Instagram Comment' },
  { value: SocialTaskTypeEnum.INSTAGRAM_SHARE, label: 'Instagram Share' },
  { value: SocialTaskTypeEnum.TELEGRAM_JOIN, label: 'Telegram Join' },
  { value: SocialTaskTypeEnum.VISIT_WEBSITE, label: 'Visit Website' },
];

export const getTaskCellConfigs = (
  task: Task,
  utils: {
    handleDelete: (task: Task) => void;
    setCurrent: (task: Task) => void;
    setEditOpen: (open: boolean) => void;
    setIsViewOpen: (open: boolean) => void;
    getStatusColor: (active: boolean) => string;
    formatDate: (date?: string) => string;
  }
): CellPropsTask[] => {
  const { handleDelete, setCurrent, setEditOpen, getStatusColor, formatDate,setIsViewOpen } = utils;

  return [
    {
      type: 'title',
      children: task.title ?? `${task.title}`,
      createdAt: formatDate(task?.createdAt),
    },
    {
      type: "description",
      value: task.description,
    },
    {
      type: 'type',
      children: <TypeCol type={task.type } />,
    },
    {
      type: 'pointsReward',
      value: Math.floor(Number(task?.pointsReward ?? 0)).toLocaleString('en-US'),
    },
    {
      type: 'frequency',
      value: task.frequency,
    },
    {
      type: 'socialTaskType',
      value: task.socialTaskType,
      children: <SocialTypeCol type={task.socialTaskType} />,
    },
    {
      type: 'status',
      value: task?.active ?? false,
      getStatusColor,
    },
    {
      type: 'deletedAt',
      value: formatDate(task?.deletedAt),
    },
    {
      type: 'actions',
      onEdit: () => {
        setCurrent(task);
        setEditOpen(true);
      },
      onView: () => {
        setCurrent(task);
        setIsViewOpen(true);
      },
      onDelete: () => handleDelete(task),
    },
  ];
};