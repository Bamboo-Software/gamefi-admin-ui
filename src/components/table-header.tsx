import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { TableHead } from "./ui/table";
import React from "react";
interface TableHeadSortableProps {
  onClick?: () => void;
  sortConfig: { key: string; direction: 'ASC' | 'DESC' } | null;
  columnKey: string;
  icon: React.ReactNode;
  title: string;
}
const TableColumnHeader = React.memo(({
  onClick,
  sortConfig,
  columnKey,
  icon,
  title,
}: TableHeadSortableProps) => {
  return (
    <TableHead 
      className={`cursor-pointer ${columnKey === 'id' || columnKey === 'email' ? 'max-w-[100px]' : ''}`} 
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        {icon}
        {title}
        {columnKey !== 'action' && sortConfig?.key === columnKey ? (
          sortConfig.direction === 'ASC' ? (
            <ArrowUp className="inline h-4 w-4 ml-1" />
          ) : (
            <ArrowDown className="inline h-4 w-4 ml-1" />
          )
        ) : columnKey !== 'action' ? (
          <ArrowUpDown className="inline h-4 w-4 ml-1" />
        ) : null}
      </div>
    </TableHead>
  );
});

export default TableColumnHeader;
