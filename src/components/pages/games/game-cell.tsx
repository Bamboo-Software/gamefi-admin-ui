/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Coins, MoreHorizontal } from 'lucide-react';
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

type CellTypeGame =
  | 'title'
  | 'description'
  | 'category'
  | 'difficultyLevels'
  | 'version'
  | 'active'
  | 'url'
  | 'requiredPoints'
  | 'createdAt'
  | 'deletedAt'
  | 'actions';

  export interface CellPropsGame {
    type: CellTypeGame;
    value?: string | number | boolean;
    createdAt?: string;
    children?: React.ReactNode;
    getStatusColor?: (active: boolean) => string;
      onEdit?: () => void;
      
    onView?: () => void;
    onDelete?: () => void;
}
  
const renderTitle = ({ children }: Omit<CellPropsGame, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);

const renderCategory = ({ children }: Omit<CellPropsGame, 'type' | 'value'>) => (
  <TableCell className="font-medium">{children}</TableCell>
);

const renderDifficultyLevels = ({value}: Omit<CellPropsGame, 'type'>) => {
  return (
    <TableCell className="font-medium space-x-1">
      {value}
    </TableCell>
  );
};


const renderVersion = ({ value }: { value?: string }) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderUrl = ({ value }: { value?: string }) => (
  <TableCell className="font-medium text-blue-600 underline cursor-pointer">
    <a href={value} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  </TableCell>
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

const renderRequiredPoints = (value?: number) => (
  <TableCell className="font-medium">
    <div className="flex items-center gap-1">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium">{value ?? 0}</span>
    </div>
  </TableCell>
);

const renderCreatedAt = (value?: string) => (
  <TableCell className="font-medium">{value}</TableCell>
);

const renderDeletedAt = ({ children ,value}: Omit<CellPropsGame, 'type'>) => {
  console.log("🚀 ~ children:", children)
  return <TableCell className="font-medium">{value ?? ''}</TableCell>
	
}

const renderActive = ({ value, getStatusColor }: any) => (
  <TableCell>
    <Badge className={getStatusColor(value)}>
      <span className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-400'}`} />
        {value ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  </TableCell>
);

const renderActions = ({ onEdit, onDelete, onView }: any) => (
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
        <DropdownMenuItem onClick={onEdit}>Edit game</DropdownMenuItem>
        {onView && <DropdownMenuItem onClick={onView}>View game</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete game</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);

const TableGameGenericCell: React.FC<CellPropsGame> = React.memo(({ type, ...rest }) => {
  switch (type) {
    case "title":
      return renderTitle(rest as { children: React.ReactNode });
    case "description":
      return renderDescription(rest as { value?: string });
    case "category":
      return renderCategory(rest as { children: React.ReactNode });
      case "active":
        return renderActive(rest as { value: boolean; getStatusColor: (active: boolean) => string });
    case "difficultyLevels":
      return renderDifficultyLevels(rest as { children: React.ReactNode });
    case "version":
      return renderVersion(rest as { value?: string });
    case "url":
      return renderUrl(rest as { value?: string });
    case "requiredPoints":
      return renderRequiredPoints((rest as { value?: number }).value);
    case "createdAt":
      return renderCreatedAt((rest as { value?: string }).value);
      case "deletedAt":
        return renderDeletedAt(rest as { children: React.ReactNode });      
    case "actions":
      return renderActions(rest as { onEdit?: () => void; onView?: () => void; onDelete?: () => void });
    default:
      return <TableCell>{(rest as { value?: string | number | boolean }).value ?? ''}</TableCell>;
  }
});

export default TableGameGenericCell;