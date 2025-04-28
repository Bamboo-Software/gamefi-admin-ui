/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Coins, MoreHorizontal, Repeat, Award } from 'lucide-react';
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
type CellTypeTask =
  | 'title'
  | 'description'
  | 'type'
  | 'pointsReward'
  | 'frequency'
  | 'status'
  | 'requiredCount'
  | 'lastLoginAt'
  | 'socialTaskType'
  | 'deletedAt'
  | 'actions';

  export interface CellPropsTask {
    type: CellTypeTask;
    value?: string | number | boolean;
    createdAt?: string;
    children?: React.ReactNode;
    getStatusColor?: (active: boolean) => string;
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
  }

const renderTitle = ({ children }: Omit<CellPropsTask, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);
const renderType = ({ children }: Omit<CellPropsTask, 'type' | 'value'>) => {
  return (
    <TableCell className="font-medium">{children}</TableCell>
    )
}
const renderSocialTaskType = ({ children }: Omit<CellPropsTask, 'type' | 'value'>) => {
  return (
    <TableCell className="font-medium">{children}</TableCell>
    )
}
const renderDescription = ({ value }: {value:string}) => (
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

const renderPointsReward = (value: number) => (
  <TableCell className="font-medium">
    <div className="flex items-center gap-2 text-sm">
      <Award className="inline w-4 h-4 mr-1 text-yellow-500" />
      <span>{value ?? 0}</span>
    </div>
  </TableCell>
);
const renderFrequency = (value: number) => (
  <TableCell className="font-medium">
    <div className="flex items-center gap-2 text-sm">
      <Repeat className="inline w-4 h-4 mr-1 text-indigo-500" />
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

const renderDeletedAt = (value: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderActions = ({ onEdit, onDelete,onView }: any) => (
  <TableCell className="text-right flex justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onEdit}>Edit task</DropdownMenuItem>
        {onView && <DropdownMenuItem onClick={onView}>View task</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);


const TableTaskGenericCell: React.FC<CellPropsTask> = React.memo(({ type, ...rest }) => {
  switch (type) {
    case "title":
      return renderTitle(rest as { children: React.ReactNode });
    case "description":
      return renderDescription(rest as { value: string });
    case "type":
      return renderType(rest as { children: React.ReactNode });
    case "socialTaskType":
      return renderSocialTaskType(rest as { children: React.ReactNode });
    case "requiredCount":
      return renderPoints((rest as { value: string }).value);
    case "frequency":
      return renderFrequency((rest as { value: number }).value);
    case "pointsReward":
      return renderPointsReward((rest as { value: number }).value);
    case "status":
      return renderStatus(rest as { value: boolean; getStatusColor: (active: boolean) => string });
    case "deletedAt":
      return renderDeletedAt((rest as { value: string }).value);
    case "actions":
      return renderActions(rest as { onEdit?: () => void; onView?: () => void; onDelete?: () => void });
    default:
      return <TableCell>{(rest as { value?: string | number | boolean }).value ?? ''}</TableCell>;
  }
});

export default TableTaskGenericCell;
