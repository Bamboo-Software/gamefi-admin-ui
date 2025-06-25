import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenericSelectContent from "@/components/select-table";
import React, { useEffect, useMemo } from "react";
import { CreateNFTRequest } from '@/interfaces/nfts';
import { createSeasonApi } from '@/services/seasons';
import { Season } from '@/interfaces/seasons';



const DialogCreateNFT = ({
  isCreateNFTOpen,
  setIsCreateNFTOpen,
  handleCreateNFTGame,
}: {
  isCreateNFTOpen: boolean;
  setIsCreateNFTOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateNFTGame: (data: CreateNFTRequest) => Promise<void>;
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<CreateNFTRequest>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      seasonId: "",
    },
  });
      const gameApi = useMemo(() => createSeasonApi(), []);
      const { useGetAllSeasonQuery } = gameApi;
  const {  data:seasonData, isLoading } = useGetAllSeasonQuery({},{
    refetchOnMountOrArgChange:true
  });

  const SEASON_OPTIONS = seasonData?.data?.items
  ?.map((season: Season) => ({
    label: season.name,
    value: season._id,
  }));

  const onSubmit = async (data: CreateNFTRequest) => {
    await handleCreateNFTGame(data);
    reset();
    setIsCreateNFTOpen(false);
  };
useEffect(() => {
    if (!isCreateNFTOpen) {
      reset();
    }
  }, [isCreateNFTOpen, reset]);
  return (
    <Dialog open={isCreateNFTOpen} onOpenChange={setIsCreateNFTOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create NFT</DialogTitle>
          <DialogDescription>Select the season and fill in nft details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">

          <div className="flex items-center gap-4">
            <Label htmlFor="seasonId" className="text-right min-w-[120px]">Season</Label>
            <Select
              value={watch("seasonId")}
              onValueChange={(value) => setValue("seasonId", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={isLoading ? "Loading seasons..." : "Select season"} />
              </SelectTrigger>
              <GenericSelectContent options={SEASON_OPTIONS ?? []} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right min-w-[120px]">Name</Label>
            <Input id="name" {...register("name")} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right min-w-[120px]">Description</Label>
            <Input id="description" {...register("description")} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="image" className="text-right min-w-[120px]">Image</Label>
            <Input id="image" {...register("image")}  />
          </div>

         
          <div className="flex items-center gap-4">
            <Label htmlFor="priceUsd" className="text-right min-w-[120px]">Price In USD</Label>
            <Input id="priceUsd" type="number"  step="any" inputMode="decimal" {...register("priceUsd")} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsCreateNFTOpen(false)}>Cancel</Button>
            <Button type="submit">Create NFT</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateNFT;