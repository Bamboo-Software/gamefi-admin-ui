/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {

  Download,
  ListPlus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCreateChatMutation, useDeleteChatMutation, useGetAllChatsQuery, useUpdateChatMutation } from "@/services/chats";
import { AdminTable } from "@/components/table-admin";
import { debounce } from "lodash";
import { LoadingSpinner } from "@/components/spinner";
import GenericSelectContent from "@/components/select-table";
import { ROW_OPTIONS } from "@/constants";
import SearchInput from "@/components/input-search";
import { toast } from "sonner";
import { PageHeading } from "@/components/page-heading";
import { SectionHeader } from "@/components/section-header";
import { getStatusColor } from "@/utils";
import { CHAT_STATUS_OPTIONS, CHAT_TYPE_OPTIONS, getChatCellConfigs, TABLE_HEADERS_CHAT } from "@/constants/chat";
import TableChatGenericCell from "@/components/pages/chat/chat-cell";
import DialogCreateChat from "@/components/pages/chat/dialog-create";
import DialogViewChat from "@/components/pages/chat/dialog-view";
import DialogEditChat from "@/components/pages/chat/dialog-edit";
import ConfirmDeleteDialog from "@/components/pages/chat/dialog-delete";
const PaginationTable = React.lazy(() => import("@/components/pagination-table"));
const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ASC" | "DESC" } | null>(null);
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
  });

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [isEditChatOpen, setIsEditChatOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [isViewChatOpen, setIsViewChatOpen] = useState(false);
  const [createChat] = useCreateChatMutation();
  const debouncedSetSearchTerm = useMemo(
        () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
        []
    );
    const queryParams = useMemo(() => {
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      title: debouncedSearchTerm,
      q: debouncedSearchTerm,
      status: filters.status,
      type: filters.type,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "ASC",
    };
    const filteredParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) => value !== ""
      )
    );
    return filteredParams;
  }, [currentPage,filters, itemsPerPage, debouncedSearchTerm, sortConfig]);
  const { data:chatData, isLoading } = useGetAllChatsQuery(queryParams);
  const [updateChat] = useUpdateChatMutation();
  const [deleteChatMutation] = useDeleteChatMutation();
  const handleOpenDeleteDialog = (Chat: Chat) => {
    setCurrentChat(Chat);
    setDialogDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!currentChat) return;
    try {
      await deleteChatMutation(currentChat._id).unwrap();

    } catch {
      toast.error("Error while deleting Chat");
    } finally {
      setDialogDeleteOpen(false);
      setCurrentChat(null);
    }
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);
  const handleSelectChat = useCallback((userId: string) => {
      setSelectedChats((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    }, []);
  const handleSort = useCallback((key: string) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return prev.direction === "ASC" ? { key, direction: "DESC" } : null;
        }
        return { key, direction: "ASC" };
      });
    }, []);
    const handleEditChat = useCallback(
      async (formData: any) => {
        if (!currentChat) return;
        try {
          await updateChat({
            id: currentChat._id,
            data: formData,
          }).unwrap();
          setCurrentChat(null);
          setIsEditChatOpen(false);
        } catch (err) {
          console.error("Update chat failed:", err);
        }
      },
      [currentChat, updateChat, setIsEditChatOpen]
    );
    const memoizedChats = useMemo(() => chats, [chats]);

  const handleDeleteSelected = () => {
    setChats(chats.filter(Chat => !selectedChats.includes(Chat._id)));
    setSelectedChats([]);
  };
  const handleCreateChat = async (data: any) => {
    try {
      await createChat(data).unwrap();
      toast.success("Chat created successfully!");
      setIsCreateChatOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Chat!");
    }
  };
  const handleOpenCreateChatDialog = () => {
    setIsCreateChatOpen(true);
  };
  const handleActiveChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };
  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };
useEffect(() => {
    if (chatData?.data && chatData?.data.items) {
      setChats(chatData?.data.items);
      setTotal(chatData?.data.total);
    } else {
      setChats([]);
      setTotal(0);
    }
}, [chatData]);
  useEffect(() => {
      const maxPage = Math.ceil(total / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
  }, [total, itemsPerPage, currentPage]);
  const memoizedGetCellConfigs = useCallback(
    (chat: Chat, utils: any) => getChatCellConfigs(chat, utils),
    []
  );
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <PageHeading
          title="Chats Management"
          subtitle="Manage your chats"
      />
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenCreateChatDialog} className="cursor-pointer">
            <ListPlus className="h-4 w-4 mr-2" />
              Add Chat
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
        <SectionHeader
          title="Chats"
          description="Manage your organization's chats, chat prize, and chat description."
        />
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
              <div className="flex gap-4">
                <SearchInput placeholder={"Search Chat..."} searchTerm={searchTerm} onChange={handleChange} />
                <Select value={filters.status} onValueChange={handleActiveChange}>
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <GenericSelectContent options={CHAT_STATUS_OPTIONS} />
                </Select>
                <Select value={filters.type} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <GenericSelectContent options={CHAT_TYPE_OPTIONS} />
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
                  setFilters({
                    status: "",
                    type: "",
                  })
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
          {selectedChats.length > 0 && (
            <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
              <p className="text-sm">{selectedChats.length} users selected</p>
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
          <AdminTable<Chat>
            data={memoizedChats}
            selectedUsers={selectedChats}
            sortConfig={sortConfig}
            isLoading={isLoading}
            handleSelect={handleSelectChat}
            handleDelete={handleOpenDeleteDialog}
            setCurrent={setCurrentChat}
            setIsEditOpen={setIsEditChatOpen}
            setIsViewOpen={setIsViewChatOpen}
            getStatusColor={getStatusColor}
            handleSort={handleSort}
            getCellConfigs={memoizedGetCellConfigs}
            renderCell={(config, idx) => <TableChatGenericCell key={idx} {...config} />}
            columns={TABLE_HEADERS_CHAT}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground min-w-[200px]">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  Showing {chats.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                  {Math.min((currentPage - 1) * itemsPerPage + chats.length, total)} of {total}
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
      {currentChat && (
        <DialogEditChat isEditChatOpen={isEditChatOpen} handleEditChat={handleEditChat} setIsEditChatOpen={setIsEditChatOpen} currentChat={currentChat} />
      )}
      <ConfirmDeleteDialog
        open={dialogDeleteOpen}
        username={currentChat?.name}
        onClose={() => setDialogDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <DialogCreateChat
        isCreateChatOpen={isCreateChatOpen}
        setIsCreateChatOpen={setIsCreateChatOpen}
        handleCreateChat={handleCreateChat}
      />
     {currentChat && (
      <DialogViewChat
          isViewChatOpen={isViewChatOpen}
          setIsViewChatOpen={setIsViewChatOpen}
          currentChat={currentChat}
        />
      )}

    </div>
  );
};

export default Chats;