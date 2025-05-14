import { CellPropsUser } from '@/components/pages/user/user-cell';
import RoleCol from '@/components/pages/user/user-role';
import { RoleTypeEnum } from '@/enums/user.enums';
import { ShieldAlert, ShieldCheck, User, Eye, Mail, Shield, Coins, Ticket, CircleCheck, Clock, UserIcon, Settings } from 'lucide-react';

export const ROLE_VISUALS: Record<
  RoleTypeEnum,
  {
    icon: React.ReactNode;
    text: string;
    textColor: string;
  }
> = {
  [RoleTypeEnum.SuperAdmin]: {
    icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
    text: 'Super Admin',
    textColor: 'text-red-600',
  },
  [RoleTypeEnum.Admin]: {
    icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
    text: 'Admin',
    textColor: 'text-blue-600',
  },
  [RoleTypeEnum.User]: {
    icon: <User className="w-4 h-4 text-green-500" />,
    text: 'User',
    textColor: 'text-green-600',
  },
  [RoleTypeEnum.Guest]: {
    icon: <Eye className="w-4 h-4 text-gray-500" />,
    text: 'Guest',
    textColor: 'text-gray-600',
  },
};

export const TABLE_HEADERS = [
  {
    columnKey: 'name',
    title: 'Name',
    icon: <UserIcon className="inline w-4 h-4 mr-1 text-purple-600"/>,
  },
  {
    columnKey: 'email',
    title: 'Email',
    icon: <Mail className="inline w-4 h-4 mr-1 text-rose-500" />,
  },
  {
    columnKey: 'role',
    title: 'Role',
    icon: <Shield className="inline w-4 h-4 mr-1 text-amber-600" />,
  },
  {
    columnKey: 'pointsBalance',
    title: 'Points Balance',
    icon: <Coins className="inline w-4 h-4 mr-1 text-yellow-500" />,
  },
  {
    columnKey: 'lotteryEntries',
    title: 'Lottery Entries',
    icon: <Ticket className="inline w-4 h-4 mr-1 text-indigo-500" />,
  },
  {
    columnKey: 'status',
    title: 'Status',
    icon: <CircleCheck className="inline w-4 h-4 mr-1 text-green-600" />,
  },
  {
    columnKey: 'lastLoginAt',
    title: 'Last Login',
    icon: <Clock className="inline w-4 h-4 mr-1 text-orange-500" />,
  },
  {
    columnKey: 'deletedAt',
    title: 'Deleted At',
    icon: <Clock className="inline w-4 h-4 mr-1 text-orange-500" />,
  },
  {
    columnKey: 'action',
    title: 'Action',
    icon: <Settings className="inline w-4 h-4 mr-1 text-gray-500" />,
  },
];

export const ROLE_OPTIONS = [
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' }
];
export const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'permanent', label: 'Permanent' }
];
export const STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];
export const getUserCellConfigs = (
  user: User,
  utils: {
    handleDelete: (user: User) => void;
    setCurrent: (user: User) => void;
    setEditOpen: (open: boolean) => void;
    setIsViewOpen: (open: boolean) => void;
    getStatusColor: (active: boolean) => string;
    formatDate: (date?: string) => string;
  }
): CellPropsUser[] => {
  const { handleDelete, setCurrent, setEditOpen, getStatusColor, formatDate,setIsViewOpen } = utils;

  return [
    {
      type: 'userInfo',
      name: user.name ?? `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      createdAt: formatDate(user?.createdAt),
    },
    {
      type: "email",
      value: user.email,
    },
    {
      type: 'role',
      children: <RoleCol role={user.role} />,
    },
    {
      type: 'points',
      value: Math.floor(Number(user?.pointsBalance?.$numberDecimal ?? 0)).toLocaleString('en-US'),
    },
    {
      type: 'lottery',
      value: user?.lotteryEntries ?? 0,
    },
    {
      type: 'status',
      value: user?.active ?? false,
      getStatusColor,
    },
    {
      type: 'lastLoginAt',
      value: formatDate(user?.lastLoginAt),
    },
    {
      type: 'deletedAt',
      value: formatDate(user?.deletedAt),
    },
    {
      type: 'actions',
      onEdit: () => {
        setCurrent(user);
        setEditOpen(true);
      },
      onView: () => {
        setCurrent(user);
        setIsViewOpen(true);
      } ,
      onDelete: () => handleDelete(user),
    },
  ];
};

