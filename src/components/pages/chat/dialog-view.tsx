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
import React from "react";
import { ChatStatusEnum, ChatTypeEnum } from "@/enums/chat.enum";

type Participant = {
  _id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  username: string;
};

type DialogViewChatProps = {
  isViewChatOpen: boolean;
  setIsViewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentChat: {
    name?: string;
    description?: string;
    createdById?: string;
    createdBy?: any;
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
      return `${participant.firstName || ""} ${participant.lastName || ""}`.trim() || participant.username;
    };

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


            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Participants</Label>
              <select
                multiple
                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled
              >
                {currentChat.participants?.map((participant) => (
                  <option key={participant._id} value={participant._id}>
                    {getDisplayName(participant)}
                  </option>
                ))}
              </select>
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