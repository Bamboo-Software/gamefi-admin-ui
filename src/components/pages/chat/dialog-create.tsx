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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenericSelectContent from "@/components/select-table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChatStatusEnum, ChatTypeEnum } from "@/enums/chat.enum";
import { useGetAllUsersQuery } from "@/services/users";
import { MultiCombobox } from "@/components/multi-combobox";
import { debounce } from "lodash";
import SingleCombobox from "@/components/single-combobox";
import { useUploadFileMutation } from "@/services/upload";

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

const CHAT_TYPE_OPTIONS = Object.values(ChatTypeEnum).map((v) => ({
  label: v,
  value: v,
}));

const CHAT_STATUS_OPTIONS = Object.values(ChatStatusEnum).map((v) => ({
  label: v,
  value: v,
}));

const DialogCreateChat = ({
    isCreateChatOpen,
    setIsCreateChatOpen,
    handleCreateChat,
  }: {
    isCreateChatOpen: boolean;
    setIsCreateChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreateChat: (data: FormValues) => void;
  }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [uploadFile]=useUploadFileMutation()
const [participantSearch, setParticipantSearch] = useState("");

const debouncedSetParticipantSearch = useMemo(
  () => debounce((value: string) => setParticipantSearch(value), 300),
  []
);
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
        type: ChatTypeEnum.COMMUNITY,
        participantIds: [],
      },
    });
    const onSubmit = (data: FormValues) => {
      const participantIds = data.participantIds || [];
      const dataChat =
        chatType === ChatTypeEnum.AI || chatType === ChatTypeEnum.COMMUNITY
          ? {
              ...data,
              createdById: participantIds[0],
            }
          : data;
      handleCreateChat(dataChat);
      reset();
      setThumbnailUrl(null);
      setIsCreateChatOpen(false);
    };
  const participantQueryParams = useMemo(() => {
    return {
      q: participantSearch,
      username: participantSearch,
      orderField: "createdAt",
      orderDirection: "DESC",
    };
  }, [participantSearch]);

      const { data: participantData } = useGetAllUsersQuery(participantQueryParams);
    const { data:userBot } = useGetAllUsersQuery({isBot:true});

      const PARTICIPANT_OPTIONS = useMemo(() => {
        const raw = participantData?.data?.items;
        if (!raw) return [];
        return raw.map((user) => ({
          label: user.username,
          value: user._id,
        }));
      }, [participantData]);
      const getParticipantDisplayValue = (values: string[]) => {
        if (!values.length) return "Select participants";
        const selectedOptions = PARTICIPANT_OPTIONS.filter((opt) => values.includes(opt.value));
        if (selectedOptions.length <= 1) {
          return selectedOptions.map((opt) => opt.label).join(", ");
        }
        return `${selectedOptions.slice(0, 1).map((opt) => opt.label).join(", ")} + more`;
      };
  const chatType = watch("type");
  useEffect(() => {
    if (!isCreateChatOpen) {
      reset();
      setParticipantSearch("")
      setThumbnailUrl(null);
    }
  }, [isCreateChatOpen, reset]);
    return (
      <Dialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Chat</DialogTitle>
            <DialogDescription>Fill in the information to create a new chat.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="min-w-[120px]">Name</Label>
              <Input id="name" {...register("name")} placeholder="Enter chat name" />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="min-w-[120px]">Description</Label>
              <Input id="description" {...register("description")} placeholder="Enter description" />
            </div>
 {(chatType === ChatTypeEnum.AI || chatType === ChatTypeEnum.COMMUNITY) ? (
              <div className="flex items-center gap-4">
                <Label className="min-w-[120px]">Participants</Label>
                <SingleCombobox
                  className="max-w-[400px]"
                  options={PARTICIPANT_OPTIONS}
                  returnAsArray={true}
                  value={watch("participantIds") || []}
                  onChange={(val: any) => setValue("participantIds", val)}
                  placeholder="Select participants"
                  onSearch={handleParticipantSearch}
                />
              </div>
            )
              : (
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
          )
          }

            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Chat Type</Label>
              <Select
                value={watch("type")}
                onValueChange={(val) => setValue("type", val as ChatTypeEnum)}
              >
                <SelectTrigger className="max-w-[400px]">
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
                <Label htmlFor="botId" className="min-w-[120px]">Bot ID</Label>
                <Select
                  onValueChange={(value) => setValue("botId", value)}
                  defaultValue={watch("botId")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a bot" />
                  </SelectTrigger>
                  <SelectContent>
                    {userBot?.data.items?.map((bot: any) => (
                      <SelectItem key={bot._id} value={bot._id}>
                        {bot.name || bot.username || `Bot ${bot._id}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-4">
              <Label htmlFor="thumbnail" className="min-w-[120px]">Thumbnail</Label>
              <Input
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
                <img src={thumbnailUrl} alt="Thumbnail Preview" className="max-h-40 rounded-md" />
              </div>
              )}
            </div>


            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateChatOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Chat</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogCreateChat;
  