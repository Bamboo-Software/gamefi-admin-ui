/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins, Ticket, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

type CellType =
  | 'checkbox'
  | 'id'
  | 'userInfo'
  | 'email'
  | 'role'
  | 'points'
  | 'lottery'
  | 'status'
  | 'date'
  | 'actions';

export interface CellProps {
    type: CellType;
    value?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }


const renderCheckbox = ({ checked, onChange, label }: any) => (
  <TableCell>
    <Checkbox checked={checked} onCheckedChange={onChange} aria-label={label} />
  </TableCell>
);

const renderId = (value: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderUserInfo = ({ name, avatar, createdAt }: any) => (
  <TableCell>
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar ?? 'https://github.com/shadcn.png'} alt={name} />
        <AvatarFallback>{name?.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Joined {createdAt}</p>
      </div>
    </div>
  </TableCell>
);

const renderRole = ({ children }: any) => (
  <TableCell className="font-medium">{children}</TableCell>
);
const renderEmail = ({ value }: any) => (
  <TableCell className="font-medium">{value}</TableCell>
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

const renderDate = (value: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderActions = ({ onEdit, onDelete, onView }: any) => (
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
        {onView && <DropdownMenuItem onClick={onView}>View user</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);


const TableGenericCell: React.FC<CellProps> = ({ type, value, ...rest }) => {
  switch (type) {
    case 'checkbox': return renderCheckbox(rest);
    case 'id': return renderId(value);
    case 'userInfo': return renderUserInfo(rest);
    case 'email': return renderEmail({ value,...rest });
    case 'role': return renderRole(rest);
    case 'points': return renderPoints(value);
    case 'lottery': return renderLottery(value);
    case 'status': return renderStatus({ value, ...rest });
    case 'date': return renderDate(value);
    case 'actions': return renderActions(rest);
    default: return <TableCell>{value}</TableCell>;
  }
};

export default TableGenericCell;
