import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { useGetAllUsersQuery } from "@/services/users";
import RowsSelectContent from "@/components/select-table";
import { LoadingSpinner } from "@/components/spinner";
import { debounce } from "lodash";
import SearchInput from "@/components/input-search";

// Lazy-loaded components
const AdminTable = React.lazy(() => import("@/components/table-user"));
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

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      email: debouncedSearchTerm,
      q: debouncedSearchTerm,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "ASC",
    }),
    [currentPage, itemsPerPage, debouncedSearchTerm, sortConfig]
  );

  const { data, isLoading } = useGetAllUsersQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
    []
  );

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

  const getStatusColor = useMemo(
    () => (active: boolean) =>
      active
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    []
  );

  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  }, []);

  const handleEditUser = useCallback(() => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((user) => (user._id === currentUser._id ? { ...user, ...currentUser } : user))
    );
    setCurrentUser(null);
    setIsEditUserOpen(false);
  }, [currentUser]);

  const handleSelectAll = useCallback(() => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map((user) => user._id));
  }, [selectedUsers.length, users]);

  const handleDeleteSelected = useCallback(() => {
    setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user._id)));
    setSelectedUsers([]);
  }, [selectedUsers]);

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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage your organization's users and their permissions
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage your organization's users, their roles, and permissions.
            </CardDescription>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <SearchInput searchTerm={searchTerm} onChange={handleChange} />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearchTerm("");
                    setSortConfig(null);
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
                  <RowsSelectContent />
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedUsers.length > 0 && (
              <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
                <p className="text-sm">{selectedUsers.length} users selected</p>
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            )}
            <AdminTable
              users={users}
              selectedUsers={selectedUsers}
              sortConfig={sortConfig}
              isLoading={isLoading}
              handleSelectUser={handleSelectUser}
              handleDeleteUser={handleDeleteUser}
              setCurrentUser={setCurrentUser}
              setIsEditUserOpen={setIsEditUserOpen}
              getStatusColor={getStatusColor}
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
            />
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
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to the user's information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {currentUser && (
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-center mb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`${currentUser.avatar}?w=32`}
                      srcSet={`${currentUser.avatar}?w=32 1x, ${currentUser.avatar}?w=64 2x`}
                      sizes="32px"
                      alt={currentUser.name}
                      loading="lazy"
                    />
                    <AvatarFallback>
                      {currentUser.name?.split(" ")?.map((n: string) => n[0])?.join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentUser(null);
                  setIsEditUserOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Suspense>
  );
};

export default React.memo(Users);