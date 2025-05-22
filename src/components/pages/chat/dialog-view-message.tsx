import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import { useModulePrefix } from '@/hooks/useModulePrefix';
import { skipToken } from '@reduxjs/toolkit/query';
import { createChatApi } from '@/services/chats';

export interface ChatRoomMessage {
  id: string;
  _id: string;
  chatId: string;
  senderId: string;
  type: string;
  content: string;
  isRead: boolean;
  sender: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface DialogViewChatMessageProps {
  isViewChatMessageOpen: boolean;
  setIsViewChatMessageOpen: (open: boolean) => void;
  currentChat:Chat
}

const DialogViewChatMessage = ({
  isViewChatMessageOpen,
  setIsViewChatMessageOpen,
  currentChat,
}: DialogViewChatMessageProps) => {
  console.log("🚀 ~ currentChat:", currentChat)
  console.log("🚀 ~ isViewChatMessageOpen:", isViewChatMessageOpen)
 const prefix = useModulePrefix();
    const chatApi = useMemo(() => createChatApi(prefix), [prefix]);
    const { useGetAllMessageChatInfiniteQuery } = chatApi;
   const queryArg = useMemo(() => {
  return currentChat ? { chatId: currentChat._id, prefix } : skipToken;
}, [currentChat, prefix]);


    const {
  data,
  isFetching,
  fetchNextPage,
  hasNextPage,
  refetch,
} = useGetAllMessageChatInfiniteQuery(queryArg, {
  refetchOnMountOrArgChange: true,
});
useEffect(() => {
  if (isViewChatMessageOpen && currentChat) {
    refetch();
  }
}, [isViewChatMessageOpen, currentChat, refetch]);
    const messages = data?.pages.flatMap(page => page.data.items) || [];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
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
  return (
    <Dialog open={isViewChatMessageOpen} onOpenChange={setIsViewChatMessageOpen}>
      <DialogContent className="max-w-2xl flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Messages</DialogTitle>
        </DialogHeader>

        <div
                  ref={scrollContainerRef}
                  className="max-h-96 overflow-auto border rounded p-2"
                >
          {isFetching && (
            <div className="text-center text-sm text-muted-foreground">
              Loading...
            </div>
          )}

          {messages.map((msg) => {
            const isMe = msg.senderId === currentChat._id;
            return (
              <div
                key={msg._id}
                className={clsx('flex items-start space-x-2', {
                  'justify-end flex-row-reverse space-x-reverse': isMe,
                })}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.sender.avatar} />
                  <AvatarFallback>
                    {msg?.sender?.username?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={clsx(
                    'px-3 py-2 rounded-lg max-w-xs shadow text-sm',
                    {
                      'bg-primary text-primary-foreground': isMe,
                      'bg-muted': !isMe,
                    }
                  )}
                >
                  <div className='truncate'>{msg.content}</div>
                  <div className="text-[10px] text-muted-foreground text-right mt-1">
                    {formatDistanceToNow(new Date(msg.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogViewChatMessage;
