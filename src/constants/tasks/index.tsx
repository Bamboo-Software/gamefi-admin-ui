import { CellPropsTask } from '@/components/pages/tasks/task-cell';
import SocialTypeCol from '@/components/pages/tasks/task-social';
import TypeCol from '@/components/pages/tasks/task-type';
import { SocialTaskTypeEnum, TaskTypeEnum } from '@/enums/task.enums';
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
  { value: 'social', label: 'Social' },
  { value: 'referral', label: 'Referral' },
  { value: 'game', label: 'Game' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'other', label: 'Other' }
];
export const SOCIAL_TYPE_OPTIONS = [
  { value: 'youtube_subscribe', label: 'Youtube Subscribe' },
  { value: 'youtube_watch', label: 'Youtube Watch' },
  { value: 'youtube_like', label: 'Youtube Like' },
  { value: 'youtube_comment', label: 'Youtube Comment' },
  { value: 'tiktok_watch', label: 'Tiktok Watch' },
  { value: 'tiktok_like', label: 'Tiktok Like' },
  { value: 'tiktok_comment', label: 'Tiktok Comment' },
  { value: 'tiktok_share', label: 'Tiktok Share' },
  { value: 'x_follow', label: 'X Follow' },
  { value: 'x_like', label: 'X Like' },
  { value: 'x_comment', label: 'X Comment' },
  { value: 'x_share', label: 'X Share' },
  { value: 'facebook_like', label: 'Facebook Like' },
  { value: 'facebook_share', label: 'Facebook Share' },
  { value: 'instagram_follow', label: 'Instagram Follow' },
  { value: 'instagram_like', label: 'Instagram Like' },
  { value: 'instagram_comment', label: 'Instagram Comment' },
  { value: 'instagram_share', label: 'Instagram Share' },
  { value: 'telegram_join', label: 'Telegram Join' },
  { value: 'visit_website', label: 'Visit Website' }
]
export const getTaskCellConfigs = (
  task: Task,
  utils: {
    handleDelete: (task: Task) => void;
    setCurrent: (task: Task) => void;
    setEditOpen: (open: boolean) => void;
    setIsViewTaskOpen: (open: boolean) => void;
    getStatusColor: (active: boolean) => string;
    formatDate: (date?: string) => string;
  }
): CellPropsTask[] => {
  const { handleDelete, setCurrent, setEditOpen, getStatusColor, formatDate,setIsViewTaskOpen } = utils;

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
        setIsViewTaskOpen(true);
      },
      onDelete: () => handleDelete(task),
    },
  ];
};