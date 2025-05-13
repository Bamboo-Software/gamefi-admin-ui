/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenericSelectContent from "@/components/select-table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChatStatusEnum, ChatTypeEnum } from "@/enums/chat.enum";
import { useGetAllUsersQuery } from "@/services/users";
import { MultiCombobox } from "@/components/multi-combobox";
import { debounce } from "lodash";
import { useUploadFileMutation } from "@/services/upload";

type User = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  name?: string;
};

type FormValues = {
  name?: string;
  description?: string;
  createdById?: string;
  participantIds?: string[];
  type: ChatTypeEnum;
  status?: ChatStatusEnum;
  thumbnail?: string;
  botId?: string;
};

type DialogEditChatProps = {
  isEditChatOpen: boolean;
  setIsEditChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditChat: (data: FormValues) => void;
  currentChat: {
    name?: string;
    description?: string;
    createdById?: string;
    participantIds?: string[];
    type: ChatTypeEnum;
    status?: ChatStatusEnum;
    thumbnail?: string;
    botId?: string;
    createdBy?: User;
    participants?: User[];
  } | null;
};

const CHAT_TYPE_OPTIONS = Object.values(ChatTypeEnum).map((v) => ({
  label: v,
  value: v,
}));

const CHAT_STATUS_OPTIONS = Object.values(ChatStatusEnum).map((v) => ({
  label: v,
  value: v,
}));

const DialogEditChat = ({
  isEditChatOpen,
  setIsEditChatOpen,
  handleEditChat,
  currentChat,
}: DialogEditChatProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState<string | null>(null);
  const [uploadFile] = useUploadFileMutation();
  // const [creatorSearch, setCreatorSearch] = useState("");
  const [participantSearch, setParticipantSearch] = useState("");

  // const debouncedSetCreatorSearch = useMemo(
  //   () => debounce((value: string) => setCreatorSearch(value), 300),
  //   []
  // );
  const debouncedSetParticipantSearch = useMemo(
    () => debounce((value: string) => setParticipantSearch(value), 300),
    []
  );

  // const handleCreatorSearch = useCallback(
  //   (query: string) => {
  //     debouncedSetCreatorSearch(query);
  //   },
  //   [debouncedSetCreatorSearch]
  // );

  const handleParticipantSearch = useCallback(
    (query: string) => {
      debouncedSetParticipantSearch(query);
    },
    [debouncedSetParticipantSearch]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      createdById: "",
      participantIds: [],
      type: ChatTypeEnum.PRIVATE,
      status: ChatStatusEnum.ACTIVE,
      thumbnail: "",
      botId: "",
    },
  });

  useEffect(() => {
    if (currentChat) {
      reset({
        name: currentChat.name || "",
        description: currentChat.description || "",
        createdById: currentChat.createdById || "",
        participantIds: currentChat.participantIds || [],
        type: currentChat.type || ChatTypeEnum.PRIVATE,
        status: currentChat.status || ChatStatusEnum.ACTIVE,
        thumbnail: currentChat.thumbnail || "",
        botId: currentChat.botId || "",
      });
      const thumbnail = currentChat.thumbnail || null;
      setThumbnailUrl(thumbnail);
      setOriginalThumbnailUrl(thumbnail);
    } else {
      reset({
        name: "",
        description: "",
        createdById: "",
        participantIds: [],
        type: ChatTypeEnum.PRIVATE,
        status: ChatStatusEnum.ACTIVE,
        thumbnail: "",
        botId: "",
      });
      setThumbnailUrl(null);
      setOriginalThumbnailUrl(null);
    }
  }, [currentChat, reset]);
  useEffect(() => {
    if (!isEditChatOpen){
      reset();
      setThumbnailUrl(null);
    }
  }, [isEditChatOpen, reset]);
  const onSubmit = (data: FormValues) => {
    if (!currentChat) return;
    if (data.type !== ChatTypeEnum.AI) {
      delete data.botId;
    }
    handleEditChat(data);
    reset();
    setThumbnailUrl(null);
    setOriginalThumbnailUrl(null);
    setIsEditChatOpen(false);
  };

  const handleCancel = () => {
    reset();
    setThumbnailUrl(originalThumbnailUrl);
    setIsEditChatOpen(false);
  }

  const participantQueryParams = useMemo(() => {
    return {
      q: participantSearch,
      username: participantSearch,
      orderField: "createdAt",
      orderDirection: "DESC",
    };
  }, [participantSearch]);

  const { data: participantData } = useGetAllUsersQuery(participantQueryParams, {
    refetchOnMountOrArgChange: true,
  });


  const PARTICIPANT_OPTIONS = useMemo(() => {
    const raw = participantData?.data?.data || [];
    const options = raw.map((user) => ({
      label: user.username,
      value: user._id,
    }));
    

    if (currentChat?.participants) {
      currentChat.participants.forEach((participant) => {
        if (!options.some((opt) => opt.value === participant._id)) {
          options.push({
            label: participant.username,
            value: participant._id,
          });
        }
      });
      }
    console.log("🚀 ~ options ~ options:", options)

    return options;
  }, [participantData, currentChat]);
 const getParticipantDisplayValue = (values: string[]) => {
    if (!values.length) return "";
    const selectedOptions = PARTICIPANT_OPTIONS.filter((opt) => values.includes(opt.value));
    if (selectedOptions.length <= 1) {
      return selectedOptions.map((opt) => opt.label).join(", ");
    }
    return `${selectedOptions.slice(0, 1).map((opt) => opt.label).join(", ")} + more`;
  };
  const chatType = watch("type");

  if (!currentChat) {
    return (
      <Dialog open={isEditChatOpen} onOpenChange={setIsEditChatOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Chat</DialogTitle>
            <DialogDescription>No chat selected to edit.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => setIsEditChatOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
 
  return (
    <Dialog open={isEditChatOpen} onOpenChange={setIsEditChatOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Chat</DialogTitle>
          <DialogDescription>Update the information for the chat.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="min-w-[120px]">
              Name
            </Label>
            <Input id="name" {...register("name")} placeholder="Enter chat name" className="max-w-[400px]"/>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="min-w-[120px]">
              Description
            </Label>
            <Input
              className="max-w-[400px]"
              id="description"
              {...register("description")}
              placeholder="Enter description"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="min-w-[120px]">Participants</Label>
            <MultiCombobox
              className="max-w-[400px]"
              options={PARTICIPANT_OPTIONS}
              values={watch("participantIds") || []}
              onChange={(vals) => setValue("participantIds", vals)}
              placeholder="Select participants"
              onSearch={handleParticipantSearch}
              displayValue={getParticipantDisplayValue}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="min-w-[120px]">Chat Type</Label>
                      <Select
              value={watch("type")}
              onValueChange={(val) => setValue("type", val as ChatTypeEnum)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <GenericSelectContent options={CHAT_TYPE_OPTIONS} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label className="min-w-[120px]">Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(val) => setValue("status", val as ChatStatusEnum)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <GenericSelectContent options={CHAT_STATUS_OPTIONS} />
            </Select>
          </div>

          {chatType === ChatTypeEnum.AI && (
            <div className="flex items-center gap-4">
              <Label htmlFor="botId" className="min-w-[120px]">
                Bot ID
              </Label>
              <Input className="max-w-[400px]" id="botId" {...register("botId")} placeholder="Enter bot ID" />
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4">
              <Label htmlFor="thumbnail" className="min-w-[120px]">
                Thumbnail
              </Label>
                          <Input
                              className="max-w-[400px]"
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const res = await uploadFile(file).unwrap();
                    const uploadedUrl = res?.data?.url;
                    if (uploadedUrl) {
                      setValue("thumbnail", uploadedUrl);
                      setThumbnailUrl(uploadedUrl);
                    }
                  } catch (error) {
                    console.error("Upload failed", error);
                  }
                }}
              />
            </div>

            {thumbnailUrl && (
              <div className="flex justify-center">
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="max-h-40 rounded-md"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditChat;