import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, RefreshCw, Search, Trash2 } from "lucide-react";
import { useGetAllUsersQuery } from "@/services/users";
import TableColumnHeader from "@/components/table-header";
import { getUserCellConfigs, TABLE_HEADERS } from "@/constants/user";
import RowsSelectContent from "@/components/select-table";
import { LoadingSpinner } from "@/components/spinner";
import PaginationTable from "@/components/pagination-table";
import { formattedDate } from "@/utils";
import TableGenericCell from "@/components/pages/user/user-cell";
import { useDebounce } from "@/hooks/useDebounce";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ASC" | "DESC";
  } | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { data, isLoading } = useGetAllUsersQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      email: searchTerm,
      q: searchTerm,
      // active:true,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "ASC",
    },
    {
      refetchOnMountOrArgChange: true,
    }
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
    if (data?.data?.total) {
      const maxPage = Math.ceil(data.data.total / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage || 1);
      }
    }
  }, [data, currentPage, itemsPerPage]);


  const getStatusColor = useCallback((active: boolean) => {
    switch (active) {
      case true:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  }, []);

  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((id) => id !== userId)
    );
  }, []);

  const handleEditUser = () => {
    if (!currentUser) return;
    const updatedUsers = users?.map((user) =>
      user._id === currentUser._id ? { ...user, ...currentUser } : user
    );
    setUsers(updatedUsers);
    setCurrentUser(null);
    setIsEditUserOpen(false);
  };

  const cellConfigs = useMemo(() => {
    if (isLoading || !data || !users.length) {
      return [];
    }
    return users.map((user) =>
      getUserCellConfigs(
        user,
        selectedUsers,
        handleSelectUser,
        handleDeleteUser,
        setCurrentUser,
        setIsEditUserOpen,
        getStatusColor,
        formattedDate
      )
    );
  }, [
    isLoading,
    data,
    users,
    selectedUsers,
    handleSelectUser,
    handleDeleteUser,
    setCurrentUser,
    setIsEditUserOpen,
    getStatusColor,
  ]);

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const handleDeleteSelected = () => {
    setUsers(users?.filter((user) => !selectedUsers.includes(user._id)));
    setSelectedUsers([]);
  };

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        if (prevConfig.direction === 'ASC') {
          return { key, direction: 'DESC' };
        } else if (prevConfig.direction === 'DESC') {
          return null;
        }
      }
      return { key, direction: 'ASC' };
    });
  };
  const debouncedSearch = useDebounce((value: string) => {
    console.log("🔍 Searching:", value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage your organization's users and their permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your organization's users, their roles, and permissions.
          </CardDescription>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <div className="w-full flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search email..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
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
                <SelectTrigger className="w-[100px]">
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
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedUsers.length === users.length &&
                        users.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
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
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground min-w-[200px]">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  Showing{" "}
                  {users.length > 0
                    ? (currentPage - 1) * itemsPerPage + 1
                    : 0}{" "}
                  to{" "}
                  {Math.min(
                    (currentPage - 1) * itemsPerPage + users.length,
                    total
                  )}{" "}
                  of {total}
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
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>
                    {currentUser.name
                      ?.split(" ")
                      ?.map((n: string) => n[0])
                      ?.join("")}
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
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) =>
                    setCurrentUser({ ...currentUser, role: value })
                  }
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
  );
};

export default Users;