import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type CellTypeChat =
  | 'name'
  | 'description'
  | 'type'
  | 'status'
  | 'createdById'
  | 'participantIds'
  | 'botId'
  | 'lastMessage'
  | 'lastMessageAt'
  | 'isRead'
  | 'unreadCount'
  | 'actions';

export interface CellPropsChat {
  type: CellTypeChat;
  value?: string | number | boolean;
  color?: string;
  children?: React.ReactNode;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const renderSimple = ({ value }: { value?: string | number | boolean }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
              <TableCell className="font-medium max-w-[100px] truncate">
                  {String(value ?? '')}
                </TableCell>
      </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium max-w-[200px] truncate">{value}</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
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

const renderStatus = ({ value, color }: { value?: string; color?: string }) => (
  <TableCell>
    <Badge className={color}>{value}</Badge>
  </TableCell>
);

const renderIsRead = ({ value }: { value?: boolean }) => (
  <TableCell>
    {value ? (
      <FaCheckCircle className="text-green-500 w-4 h-4" />
    ) : (
      <FaTimesCircle className="text-red-500 w-4 h-4" />
    )}
  </TableCell>
);
const renderParticipants = ({ value }: { value?: number }) => (
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
  
const renderActions = ({ onEdit, onDelete, onView }: Partial<CellPropsChat>) => (
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
        <DropdownMenuItem onClick={
          (e) => {
            e.stopPropagation()
            onEdit?.()
          }
          }>Edit chat</DropdownMenuItem>
        {onView && <DropdownMenuItem onClick={
          (e) => {
            e.stopPropagation();
            onView()
          }
          }>View chat</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete chat</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);

const TableChatGenericCell: React.FC<CellPropsChat> = React.memo(({ type, ...rest }) => {
  switch (type) {
    case 'name':
    case 'type':
    case 'createdById':
    case 'participantIds':
      return renderParticipants(rest as { value?: number });
    case 'botId':
    case 'lastMessage':
    case 'lastMessageAt':
    case 'unreadCount':
      return renderSimple(rest as { value?: string | number });
    case 'description':
      return renderDescription(rest as { value?: string });
    case 'status':
      return renderStatus(rest as { value?: string; color?: string });
    case 'isRead':
      return renderIsRead(rest as { value?: boolean });
    case 'actions':
      return renderActions(rest);
    default:
      return <TableCell>{(rest as { value?: string | number | boolean }).value ?? ''}</TableCell>;
  }
});

export default TableChatGenericCell;
