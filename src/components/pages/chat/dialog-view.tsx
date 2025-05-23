/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ChatStatusEnum, ChatTypeEnum } from "@/enums/chat.enum";
import { skipToken } from "@reduxjs/toolkit/query";
import { createChatApi } from "@/services/chats";
import { useModulePrefix } from "@/hooks/useModulePrefix";

type Participant = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?:string
  name?: string;
  username: string;
};

type DialogViewChatProps = {
  isViewChatOpen: boolean;
  setIsViewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentChat: {
    _id?:string
    name?: string;
    description?: string;
    createdById?: string;
    createdBy?: any;
    email?: string;
    createdByName?: string;
    participantIds?: string[];
    participantNames?: string[];
    type: ChatTypeEnum;
    status?: ChatStatusEnum;
    thumbnail?: string;
    botId?: string;
    participants?: Participant[];
  };
};

const DialogViewChat = React.memo(
  ({ isViewChatOpen, setIsViewChatOpen, currentChat }: DialogViewChatProps) => {
    const getDisplayName = (participant: Participant) => {
      if (participant.name) return participant.name;
      if (participant.username) return participant.username;
      if (participant.email) return participant.email;
      return `${participant.firstName || ""} ${participant.lastName || ""}`.trim() || participant.username;
    };
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const prefix = useModulePrefix();
    const chatApi = useMemo(() => createChatApi(prefix), [prefix]);
    const { useGetAllParticipantChatInfiniteQuery } = chatApi;
    const queryArg = useMemo(() => {
  return currentChat ? { chatId: currentChat._id as string, prefix } : skipToken;
}, [currentChat, prefix]);
    const {
      data,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isError,
      refetch
    } = useGetAllParticipantChatInfiniteQuery(queryArg, {
    refetchOnMountOrArgChange:true
  });
    const participants = data?.pages.flatMap(page => page.data.items) || [];
    const handleScroll = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const { scrollTop, clientHeight, scrollHeight } = container;
     
      if (isFetching || !hasNextPage) return;
    
    
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetching, fetchNextPage]);
    
    
      useEffect(() => {
  const container = scrollContainerRef.current;
  const timer = setTimeout(() => {
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
  }, 50);

  return () => {
    if (container) {
      container.removeEventListener("scroll", handleScroll);
    }
    clearTimeout(timer);
  };
}, [handleScroll]);
useEffect(() => {
  if (isViewChatOpen && currentChat) {
    refetch();
  }
}, [isViewChatOpen, currentChat, refetch]);
    
    return (
      <Dialog open={isViewChatOpen} onOpenChange={setIsViewChatOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View Chat</DialogTitle>
            <DialogDescription>Details of the chat.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Name</Label>
              <Input value={currentChat.name || ""} disabled />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Description</Label>
              <Input value={currentChat.description || ""} disabled />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Creator</Label>
              <Input value={currentChat?.createdByName || currentChat?.createdBy?.username || ""} disabled />
            </div>


            <div className="mt-4">
  <Label className="text-md font-semibold">Participants</Label>
  <div
    ref={scrollContainerRef}
    className="max-h-40 overflow-auto border rounded p-2"
  >
    {isError ? (
      <p className="text-red-500 text-sm mt-2">
        Error loading participants. Please try again.
      </p>
    ) : participants.length > 0 ? (
      participants.map((participant) => (
        <div
          key={participant._id}
          className="px-3 py-1 border rounded-md mb-2 text-sm bg-muted"
        >
          {getDisplayName(participant)}
        </div>
      ))
    ) : (
      <p className="text-muted-foreground text-sm mt-2">
        {isFetching ? "Loading participants..." : "No participants found."}
      </p>
    )}
    {isFetching && participants.length > 0 && (
      <p className="text-muted-foreground text-sm mt-2 text-center">
        Loading more participants...
      </p>
    )}
  </div>
</div>



            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Chat Type</Label>
              <Input value={currentChat.type} disabled />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Status</Label>
              <Input value={currentChat.status || ""} disabled />
            </div>

            {currentChat.type === ChatTypeEnum.AI && (
              <div className="flex items-center gap-4">
                <Label className="min-w-[120px]">Bot ID</Label>
                <Input value={currentChat.botId || ""} disabled />
              </div>
            )}

            {currentChat.thumbnail && (
              <div className="flex flex-col gap-2 w-full">
                <Label className="min-w-[120px]">Thumbnail</Label>
                <div className="flex justify-center">
                  <img
                    src={currentChat.thumbnail}
                    alt="Thumbnail Preview"
                    className="max-h-40 rounded-md"
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" onClick={() => setIsViewChatOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

export default DialogViewChat;