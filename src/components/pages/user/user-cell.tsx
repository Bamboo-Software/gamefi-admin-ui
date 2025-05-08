/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins, Ticket, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
type CellTypeUser =
  | 'userInfo'
  | 'email'
  | 'role'
  | 'points'
  | 'lottery'
  | 'status'
  | 'lastLoginAt'
  | 'deletedAt'
  | 'actions';

  export interface CellPropsUser {
    type: CellTypeUser;
    value?: string | number | boolean;
    name?: string;
    avatar?: string;
    createdAt?: string;
    children?: React.ReactNode;
    getStatusColor?: (active: boolean) => string;
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
  }
const renderUserInfo = ({ name, avatar, createdAt }: any) => (
  <TableCell>
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar ?? 'https://github.com/shadcn.png'} alt={name} />
        <AvatarFallback>{name?.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="font-medium max-w-[100px] truncate">{name}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p className='font-medium'>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        <p className="text-xs text-muted-foreground">Joined {createdAt}</p>
      </div>
    </div>
  </TableCell>
);

const renderRole = ({ children }: Omit<CellPropsUser, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);

const renderEmail = ({ value }: {value:string}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <TableCell className="font-medium max-w-[100px] truncate cursor-pointer">
          {value}
        </TableCell>
      </TooltipTrigger>
      <TooltipContent>
        <p className='font-medium'>{value}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const renderPoints = (value: string) => (
  <TableCell className="font-medium">
    <div className="flex items-center gap-1">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium">{value ?? '0'}</span>
    </div>
  </TableCell>
);

const renderLottery = (value: number) => (
  <TableCell className="font-medium">
    <div className="flex items-center gap-2 text-sm">
      <Ticket className="w-4 h-4 text-indigo-500" />
      <span>{value ?? 0}</span>
    </div>
  </TableCell>
);

const renderStatus = ({ value, getStatusColor }: any) => (
  <TableCell>
    <Badge className={getStatusColor(value)}>
      <span className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-400'}`} />
        {value ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  </TableCell>
);

const renderLastLoginAt = (value: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);
const renderDeletedAt = (value: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderActions = ({ onEdit, onDelete }: any) => (
  <TableCell className="text-right">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onEdit}>Edit user</DropdownMenuItem>
        {/* {onView && <DropdownMenuItem onClick={onView}>View user</DropdownMenuItem>} */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);


const TableUserGenericCell: React.FC<CellPropsUser> = React.memo(({ type, ...rest }) => {
  switch (type) {
    case "userInfo":
      return renderUserInfo(rest as { name?: string; avatar?: string; createdAt?: string });
    case "email":
      return renderEmail(rest as { value: string });
    case "role":
      return renderRole(rest as { children: React.ReactNode });
    case "points":
      return renderPoints((rest as { value: string }).value);
    case "lottery":
      return renderLottery((rest as { value: number }).value);
    case "status":
      return renderStatus(rest as { value: boolean; getStatusColor: (active: boolean) => string });
    case "lastLoginAt":
      return renderLastLoginAt((rest as { value: string }).value);
    case "deletedAt":
      return renderDeletedAt((rest as { value: string }).value);
    case "actions":
      return renderActions(rest as { onEdit?: () => void; onView?: () => void; onDelete?: () => void });
    default:
      return <TableCell>{(rest as { value?: string | number | boolean }).value ?? ""}</TableCell>;
  }
});

export default TableUserGenericCell;
