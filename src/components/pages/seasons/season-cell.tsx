/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
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

type CellTypeSeason =
  | 'name'
  | 'description'
  | 'imageURL'
  | 'game'
  | 'active'
  | 'requireNFT'
  | 'time'
  | 'createdAt'
  | 'deletedAt'
  | 'actions';

  export interface CellPropsSeason {
    type: CellTypeSeason;
    value?: string | number | boolean;
    createdAt?: string;
    children?: React.ReactNode;
    getStatusColor?: (active: boolean) => string;
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
}
const renderName = ({ children }: Omit<CellPropsSeason, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);

const renderImageURL = ({ children }: Omit<CellPropsSeason, 'type' | 'value'>) => (
  <TableCell  className="font-medium">{children}</TableCell>
);

const renderGame = ({ children }: Omit<CellPropsSeason, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);

const renderDescription = ({ value }: { value?: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <TableCell className="font-medium max-w-[100px] truncate cursor-pointer">
          {value}
        </TableCell>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium max-w-[200px] truncate">{value}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
const renderCreatedAt = (value?: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);


const renderDeletedAt = (value?: string) => {
  return <TableCell className="font-medium">{value ?? ''}</TableCell>
}

const renderTime = ({ children }: Omit<CellPropsSeason, 'type' | 'value'>) => (
  <TableCell  className="font-medium">{children}</TableCell>
);

const renderRequireNFT = ({ value, getStatusColor }: any) => (
  <TableCell>
    <Badge className={getStatusColor(value)}>
      <span className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-400'}`} />
        {value ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  </TableCell>
);

const renderActiveStatus = ({ value, getStatusColor }: any) => (
  <TableCell>
    <Badge className={getStatusColor(value)}>
      <span className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-400'}`} />
        {value ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  </TableCell>
);


const renderActions = ({ onEdit, onDelete, value }: any) => (
  
  <TableCell className="text-right">
    { value && <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={
          (e) => {
            e.stopPropagation();
            onEdit()
          }
          }>Edit season</DropdownMenuItem>
        {/* {onView && <DropdownMenuItem onClick={onView}>View game</DropdownMenuItem>} */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={
          (e) => {
            e.stopPropagation();
            onDelete()
          }
          } className="text-red-600">Delete season</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>}
    
  </TableCell>
);

const TableSeasonGenericCell: React.FC<CellPropsSeason> = React.memo(({ type, ...rest }) => {
  switch (type) {
    case "name":
      return renderName(rest as { children: React.ReactNode });
    case "description":
      return renderDescription(rest as { value?: string });
    case "imageURL":
      return renderImageURL(rest as { children: React.ReactNode });
    case "requireNFT":
        return renderRequireNFT(rest as { value: boolean; getStatusColor: (active: boolean) => string });
    case "game":
      return renderGame(rest as { children: React.ReactNode });
    case "active":
      return renderActiveStatus(rest as { value: boolean; getStatusColor: (active: boolean) => string });
    case "time":
        return renderTime(rest as { children: React.ReactNode });
    case "createdAt":
      return renderCreatedAt((rest as { value?: string }).value);
    case "deletedAt":
      return renderDeletedAt((rest as { value?: string }).value);      
    case "actions":
      return renderActions(rest as { onEdit?: () => void; onView?: () => void; onDelete?: () => void; value: boolean});
    default:
      return <TableCell>{(rest as { value?: string | number | boolean }).value ?? ''}</TableCell>;
  }
});

export default TableSeasonGenericCell;