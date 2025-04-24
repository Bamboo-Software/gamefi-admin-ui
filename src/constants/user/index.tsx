import { CellProps } from '@/components/pages/user/user-cell';
import RoleCol from '@/components/pages/user/user-role';
import { ShieldAlert, ShieldCheck, User, Eye, Mail, Shield, Coins, Ticket, CircleCheck, Clock, UserIcon, Settings } from 'lucide-react';

export const ROLE_VISUALS: Record<
  string,
  {
    icon: React.ReactNode;
    text: string;
    textColor: string;
  }
> = {
  superadmin: {
    icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
    text: 'Super Admin',
    textColor: 'text-red-600',
  },
  admin: {
    icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
    text: 'Admin',
    textColor: 'text-blue-600',
  },
  user: {
    icon: <User className="w-4 h-4 text-green-500" />,
    text: 'User',
    textColor: 'text-green-600',
  },
  guest: {
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

export const getUserCellConfigs = (
user: User, handleDeleteUser: ((user: User) => void),
setCurrentUser: (user: User) => void, setIsEditUserOpen: (open: boolean) => void, getStatusColor: (active: boolean) => string, formattedDate: (date?: string) => string,
): CellProps[] => {
  const cellConfigs: CellProps[] = [
    {
      type: 'userInfo',
      name: user.name ?? `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      createdAt: formattedDate(user?.createdAt),
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
      value: formattedDate(user?.lastLoginAt),
    },
    {
      type: 'deletedAt',
      value: formattedDate(user?.deletedAt),
    },
    {
      type: 'actions',
      onEdit: () => {
        setCurrentUser(user);
        setIsEditUserOpen(true);
      },
      onView: () => console.log('View user'),
      onDelete: () => handleDeleteUser(user),
    },
  ];

  return cellConfigs;
};
