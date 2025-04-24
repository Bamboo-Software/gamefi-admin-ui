import { formattedDate } from "@/utils";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserCellConfigs, TABLE_HEADERS } from "@/constants/user";
import TableColumnHeader from "./table-header";
import { LoadingSpinner } from "./spinner";
import TableGenericCell from "./pages/user/user-cell";

const AdminTable = React.memo(
    ({
      users,
      sortConfig,
      isLoading,
      handleDeleteUser,
      setCurrentUser,
      setIsEditUserOpen,
      getStatusColor,
      handleSort,
    }: {
        users: User[],
        isLoading: boolean,
        handleSort: (key: string) => void
        handleSelectAll: () => void
        sortConfig:{
            key: string;
            direction: "ASC" | "DESC";
        } | null,
        selectedUsers: string[],
        handleSelectUser: (id: string) => void,
        handleDeleteUser:  (user: User) => void,
        setCurrentUser: (user: User) => void,
        setIsEditUserOpen: (open: boolean) => void,
        getStatusColor: (active: boolean) => string,
    }) => {
      const cellConfigs = useMemo(() => {
        return users.map((user:User) =>
          getUserCellConfigs(
            user,
            handleDeleteUser,
            setCurrentUser,
            setIsEditUserOpen,
            getStatusColor,
            formattedDate
          )
        );
      }, [
        users,
        setCurrentUser,
        setIsEditUserOpen,
        handleDeleteUser,
        getStatusColor,
      ]);
      return (
        <div className="rounded-md border max-h-[650px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {TABLE_HEADERS.map(({ columnKey, title, icon }) => (
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
                cellConfigs.map((userConfigs, userIndex) => (
                  <TableRow key={users[userIndex]._id}>
                    {userConfigs.map((config, idx) => (
                      <TableGenericCell key={idx} {...config} />
                    ))}
                  </TableRow>
                ))
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
);
  
export default AdminTable