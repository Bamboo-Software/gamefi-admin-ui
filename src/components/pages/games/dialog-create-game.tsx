/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenericSelectContent from "@/components/select-table";
import { GameCategoryEnum } from "@/enums/game.enum";
import React from "react";
import MultiSelectField from "@/components/multi-select";
import { useGetAllGamesQuery } from "@/services/games";
type FormValues = {
  gameId: number;
  title: string;
  description: string;
  category: GameCategoryEnum;
  imageUrl: string;
  rules: string;
  version: string;
  url: string;
  requiredPoints: number;
  active: boolean;
  difficultyLevels: string[];
};
const CATEGORY_OPTIONS = Object.values(GameCategoryEnum).map((value) => ({
  label: value,
  value,
}));

const DialogCreateGame = ({
  isCreateGameOpen,
  setIsCreateGameOpen,
  handleCreateGame,
}: {
  isCreateGameOpen: boolean;
  setIsCreateGameOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateGame: (data: any) => void;
  }) => {
  const { data } = useGetAllGamesQuery();
  const { register, handleSubmit, setValue, watch,reset } = useForm<FormValues>({
    defaultValues: {
      gameId: 0,
      title: "",
      description: "",
      category: GameCategoryEnum.ARCADE,
      imageUrl: "",
      rules: "",
      version: "1.0.0",
      url: "",
      requiredPoints: 0,
      active: true,
      difficultyLevels: [],
    },
  });

  const onSubmit = (data: any) => {
    handleCreateGame(data);
    reset();
    setIsCreateGameOpen(false);
  };
  React.useEffect(() => {
    if (data?.data) {
      const nextId = data.data?.data?.length + 1;
      setValue("gameId", nextId);
    }
  }, [data, setValue]);
  return (
    <Dialog open={isCreateGameOpen} onOpenChange={setIsCreateGameOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Game</DialogTitle>
          <DialogDescription>Fill in the information to create a new game.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="gameId" className="text-right min-w-[120px]">Game ID</Label>
            <Input id="gameId" {...register("gameId")} disabled />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="title" className="text-right min-w-[120px]">Title</Label>
            <Input id="title" {...register("title")} placeholder="Enter title" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right min-w-[120px]">Description</Label>
            <Input id="description" {...register("description")} placeholder="Enter description" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="category" className="text-right min-w-[120px]">Category</Label>
            <Select
              value={watch("category")}
              onValueChange={(value) => setValue("category", value as GameCategoryEnum)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <GenericSelectContent options={CATEGORY_OPTIONS} />
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-right min-w-[120px]">Difficulty</Label>
            <MultiSelectField
              selected={watch("difficultyLevels")}
              onChange={(vals) => setValue("difficultyLevels", vals)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right min-w-[120px]">Image URL</Label>
            <Input id="imageUrl" {...register("imageUrl")} placeholder="Enter image URL" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="rules" className="text-right min-w-[120px]">Rules</Label>
            <Input id="rules" {...register("rules")} placeholder="Enter rules" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="version" className="text-right min-w-[120px]">Version</Label>
            <Input id="version" {...register("version")} placeholder="Enter version" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="url" className="text-right min-w-[120px]">Game URL</Label>
            <Input id="url" {...register("url")} placeholder="Enter game URL" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="requiredPoints" className="text-right min-w-[120px]">Required Points</Label>
            <Input id="requiredPoints" type="number" {...register("requiredPoints", { valueAsNumber: true })} placeholder="Enter required points" className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="active" className="text-right min-w-[120px]">Active</Label>
            <Select
              value={watch("active").toString()}
              onValueChange={(value) => setValue("active", value === "true")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <GenericSelectContent options={[
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" },
              ]} />
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsCreateGameOpen(false)}>Cancel</Button>
            <Button type="submit">Create Game</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateGame;
