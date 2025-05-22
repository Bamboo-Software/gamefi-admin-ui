import { ChatTypeEnum } from "@/enums/chat.enum";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    export interface Chat {
        _id: string;
        name: string;
        description?: string;
        createdById?: Types.ObjectId | string;
        participantIds: (Types.ObjectId | string)[];
        type: ChatTypeEnum;
        status: ChatStatusEnum;
        thumbnail?: string;
        lastMessage?: string;
        lastMessageAt?: Date;
        lastMessageId?: Types.ObjectId | string;
        unreadCount?: number;
        isRead?: boolean;
        botId?: Types.ObjectId | string;
        metadata?: Record<string, any>;
        createdBy?: UserLottery;
        participants?: UserLottery[];
        bot?: AIBot;
        createdAt: string;
        deletedAt: string;
        updatedAt: string;
  }
  export interface QueryChatRequest extends QueryRequest{
    username?: string;
    status?: string;
    type?: string;
  }
  export interface ChatRoomMessage {
    id: string;
    _id: string;
    chatId: string;
    senderId: string;
    type:string;
    content: string;
    isRead: boolean;
    sender: {
      id: string;
      username: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      avatar: string;
      role: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
      hasPassword: boolean;
    };
    createdAt: string;
    updatedAt: string;
  }
}
export {}