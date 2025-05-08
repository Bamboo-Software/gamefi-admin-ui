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
import React from "react";
import { useGetAllGamesQuery } from "@/services/games";
import { BLOCKCHAIN_OPTIONS, PRIZE_TYPE_OPTIONS } from "@/constants/games";

type PrizeFormValues = {
  gameId: string;
  minRank: number;
  maxRank: number;
  prizeName: string;
  prizeType: "TOKEN" | "POINT";
  amountAwarded: number;
  cryptoCurrency: string;
  blockchainName: string;
};


const DialogCreatePrize = ({
  isCreatePrizeGameOpen,
  setIsCreatePrizeGameOpen,
  handleCreatePrizeGame,
}: {
  isCreatePrizeGameOpen: boolean;
  setIsCreatePrizeGameOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreatePrizeGame: (data: PrizeFormValues) => void;
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<PrizeFormValues>({
    defaultValues: {
      gameId: "",
      minRank: 1,
      maxRank: 1,
      prizeName: "",
      prizeType: "TOKEN",
      amountAwarded: 0,
      cryptoCurrency: "",
      blockchainName: "solana",
    },
  });

  const { data, isLoading } = useGetAllGamesQuery({}, {
    refetchOnMountOrArgChange: true,
  });

  const GAME_OPTIONS = data?.data?.data
  ?.filter((game: Game) => game.gameId !== 1)
  .map((game: Game) => ({
    label: game.title,
    value: game._id,
  }));

  const onSubmit = (data: PrizeFormValues) => {
    handleCreatePrizeGame(data);
    reset();
    setIsCreatePrizeGameOpen(false);
  };

  return (
    <Dialog open={isCreatePrizeGameOpen} onOpenChange={setIsCreatePrizeGameOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Prize Leaderboard</DialogTitle>
          <DialogDescription>Select the game and fill in prize details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">

          <div className="flex items-center gap-4">
            <Label htmlFor="gameId" className="text-right min-w-[120px]">Game</Label>
            <Select
              value={watch("gameId")}
              onValueChange={(value) => setValue("gameId", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={isLoading ? "Loading games..." : "Select game"} />
              </SelectTrigger>
              <GenericSelectContent options={GAME_OPTIONS ?? []} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="minRank" className="text-right min-w-[120px]">Min Rank</Label>
            <Input id="minRank" type="number" {...register("minRank", { valueAsNumber: true })} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="maxRank" className="text-right min-w-[120px]">Max Rank</Label>
            <Input id="maxRank" type="number" {...register("maxRank", { valueAsNumber: true })} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="prizeName" className="text-right min-w-[120px]">Prize Name</Label>
            <Input id="prizeName" {...register("prizeName")} placeholder="e.g. 20 USDT" />
          </div>

          <div className="flex items-center gap-4">
            <Label className="text-right min-w-[120px]">Prize Type</Label>
            <Select
              value={watch("prizeType")}
              onValueChange={(value) => setValue("prizeType", value as PrizeFormValues["prizeType"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <GenericSelectContent options={PRIZE_TYPE_OPTIONS} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="amountAwarded" className="text-right min-w-[120px]">Amount</Label>
            <Input id="amountAwarded" type="number" {...register("amountAwarded", { valueAsNumber: true })} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="cryptoCurrency" className="text-right min-w-[120px]">Crypto</Label>
            <Input id="cryptoCurrency" {...register("cryptoCurrency")} placeholder="e.g. USDT, ETH" />
          </div>

          <div className="flex items-center gap-4">
            <Label className="text-right min-w-[120px]">Blockchain</Label>
            <Select
              value={watch("blockchainName")}
              onValueChange={(value) => setValue("blockchainName", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select blockchain" />
              </SelectTrigger>
              <GenericSelectContent options={BLOCKCHAIN_OPTIONS} />
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsCreatePrizeGameOpen(false)}>Cancel</Button>
            <Button type="submit">Create Prize</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreatePrize;
