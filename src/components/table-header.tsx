import { TableHead } from '@/components/ui/table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import React from 'react';

interface TableHeadSortableProps {
  onClick?: () => void;
  sortConfig: { key: string; direction: 'ASC' | 'DESC' } | null;
  columnKey: string;
  icon: React.ReactNode;
  title: string;
}

const TableColumnHeader  = ({
  onClick,
  sortConfig,
  columnKey,
  icon,
  title,
}: TableHeadSortableProps) => {
  return (
    <TableHead className="cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-1">
        {icon}
        {title}
        {sortConfig?.key === columnKey ? (
          sortConfig.direction === 'ASC' ? (
            <ArrowUp className="inline h-4 w-4 ml-1" />
          ) : (
            <ArrowDown className="inline h-4 w-4 ml-1" />
          )
        ) : (
          <ArrowUpDown className="inline h-4 w-4 ml-1" />
        )}
      </div>
    </TableHead>
  );
};

export default TableColumnHeader ;
