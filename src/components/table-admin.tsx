import { formattedDate } from "@/utils";
import  {  JSX,useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableColumnHeader from "./table-header";
import { LoadingSpinner } from "./spinner";
interface Identifiable {
  _id?: string;
}

const AdminTableComponent  =
  function AdminTableComponent<T extends Identifiable>({
    data,
    isLoading,
    sortConfig,
    handleDelete,
    setCurrent,
    setIsEditOpen,
    setIsViewOpen,
    setIsViewChatMessageOpen,
    getStatusColor,
    getCellConfigs,
    handleSort,
    columns,
    renderCell
  }: AdminTableProps<T>) {
    const cellConfigs = useMemo(() => {
      return data.map((item) =>
        getCellConfigs(item, {
          handleDelete: handleDelete,
          setCurrent: setCurrent,
          setEditOpen: setIsEditOpen,
          setIsViewOpen: setIsViewOpen,
          setIsViewChatMessageOpen:setIsViewChatMessageOpen,
          getStatusColor,
          formatDate: formattedDate,
        })
      );
    }, [
      data,
      setIsViewOpen,
      setCurrent,
      setIsEditOpen,
      setIsViewChatMessageOpen,
      handleDelete,
      getStatusColor,
      getCellConfigs,
    ]);

    return (
      <div className="rounded-md border max-h-[650px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ columnKey, title, icon }) => (
                <TableColumnHeader
                  key={columnKey}
                  onClick={() => handleSort(columnKey)}
                  sortConfig={sortConfig}
                  columnKey={columnKey}
                  icon={icon}
                  title={title}
                />
              ))}
            </TableRow>
          </TableHeader>
         <TableBody>
  {isLoading ? (
    <TableRow>
      <TableCell colSpan={9} className="h-24 text-center">
        <LoadingSpinner />
      </TableCell>
    </TableRow>
  ) : cellConfigs.length > 0 ? (
    cellConfigs.map((dataConfigs, index) => {
      const rowItem = data[index];

      return (
        <TableRow
          key={rowItem._id ?? index}
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={(e) => {
             e.stopPropagation();
            setCurrent(rowItem);
            setIsViewOpen(true);
          }}
        >
          {dataConfigs.map((config, idx) => renderCell(config, idx))}
        </TableRow>
      );
    })
  ) : (
    <TableRow>
      <TableCell colSpan={9} className="h-24 text-center">
        No results found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>
    );
  }
  export const AdminTable = <T extends Identifiable>(props: AdminTableProps<T>): JSX.Element => {
    return <AdminTableComponent {...props} />;
  };
