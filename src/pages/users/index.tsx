import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "@/services/users";
import { LoadingSpinner } from "@/components/spinner";
import { debounce } from "lodash";
import SearchInput from "@/components/input-search";
import DialogEditUser from "./dialog-edit";
import { ConfirmDeleteDialog } from "./dialog-delete";
import { ROW_OPTIONS } from "@/constants";
import GenericSelectContent from "@/components/select-table";
import { getUserCellConfigs, ROLE_OPTIONS, STATUS_OPTIONS, TABLE_HEADERS } from "@/constants/user";
import { getStatusColor } from "@/utils";
import { AdminTable } from "@/components/table-admin";
import TableUserGenericCell from "@/components/pages/user/user-cell";
import { PageHeading } from "@/components/page-heading";
import { SectionHeader } from "@/components/section-header";

const PaginationTable = React.lazy(() => import("@/components/pagination-table"));

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ASC" | "DESC" } | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");

  const queryParams = useMemo(() => {
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      email: debouncedSearchTerm,
      q: debouncedSearchTerm,
      role: role,
      active: active,
      username: debouncedSearchTerm,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "DESC",
    };
  
    const filteredParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) => value !== ""
      )
    );
  
    return filteredParams;
  }, [currentPage, role,active, itemsPerPage, debouncedSearchTerm, sortConfig]);
  
  const { data, isLoading } = useGetAllUsersQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
    []
  );
  const handleOpenDeleteDialog = (user: User) => {
    setCurrentUser(user);
    setDialogDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!currentUser) return;
    try {
      await deleteUserMutation(currentUser._id).unwrap();
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    } finally {
      setDialogDeleteOpen(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    if (data?.data?.data) {
      setUsers(data.data.data);
      setTotal(data.data.total);
    } else {
      setUsers([]);
      setTotal(0);
    }
  }, [data]);

  useEffect(() => {
    const maxPage = Math.ceil(total / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [total, itemsPerPage, currentPage]);


  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }, []);



const handleEditUser = useCallback(async () => {
  if (!currentUser) return;
  try {
    await updateUser({
      id: currentUser._id,
      data: { role: currentUser.role, active: currentUser.active },
    }).unwrap();
    setCurrentUser(null);
    setIsEditUserOpen(false);
  } catch (err) {
    console.error("Update user failed:", err);
  }
}, [currentUser, updateUser])



  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === "ASC" ? { key, direction: "DESC" } : null;
      }
      return { key, direction: "ASC" };
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  }, [debouncedSetSearchTerm]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <PageHeading
            title="User Management"
            subtitle=" Manage your organization's users and their permissions"
          />
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <Card>
          <CardHeader className="pb-3">
          <SectionHeader
            title="Users"
            description="Manage your organization's users, their roles, and permissions."
          />
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
              <div className="flex gap-4">
                <SearchInput placeholder={"Search user..."} searchTerm={searchTerm} onChange={handleChange} />
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value)}
                >
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <GenericSelectContent options={ROLE_OPTIONS} />
                </Select>
                <Select
                  value={active}
                  onValueChange={(value) => setActive(value)}
                >
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <GenericSelectContent options={STATUS_OPTIONS} />
                </Select>
              </div>
              <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setDebouncedSearchTerm("");
                  setSortConfig(null);
                  setRole("");
                  setActive("");
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] font-medium cursor-pointer">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <GenericSelectContent options={ROW_OPTIONS} />
              </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
          <AdminTable<User>
              data={users}
              selectedUsers={selectedUsers}
              sortConfig={sortConfig}
              isLoading={isLoading}
              handleSelect={handleSelectUser}
              handleDelete={handleOpenDeleteDialog}
              setCurrent={setCurrentUser}
              setIsEditOpen={setIsEditUserOpen}
              getStatusColor={getStatusColor}
              handleSort={handleSort}
              getCellConfigs={(user, utils) => getUserCellConfigs(user, utils)}
              renderCell={(config, idx) => <TableUserGenericCell key={idx} {...config} />}
              columns={TABLE_HEADERS} setIsViewOpen={function () {
                throw new Error("Function not implemented.");
              } }          />
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground min-w-[200px]">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Showing {users.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                    {Math.min((currentPage - 1) * itemsPerPage + users.length, total)} of {total}
                  </>
                )}
              </div>
              <PaginationTable
                currentPage={currentPage}
                totalPages={Math.floor(total / itemsPerPage)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>
        <DialogEditUser isEditUserOpen={isEditUserOpen} handleEditUser={handleEditUser} setIsEditUserOpen={setIsEditUserOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ConfirmDeleteDialog
          open={dialogDeleteOpen}
          username={currentUser?.username}
          onClose={() => setDialogDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </Suspense>
  );
};

export default React.memo(Users);