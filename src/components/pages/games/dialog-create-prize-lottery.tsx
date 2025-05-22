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
import React, { useEffect } from "react";
import { BLOCKCHAIN_OPTIONS, CRYPTO_OPTIONS, PRIZE_TYPE_LOTTERY_OPTIONS } from "@/constants/games";
import { PrizeTypeEnum } from "@/enums/game.enum";
import { BlockchainNameEnum, CryptoCurrencyEnum } from "@/enums/currency.enum";

type PrizeFormValues = {
  gameId: string;
  prizeName: string;
  prizeType: PrizeTypeEnum;
  amountAwarded: number;
  probability: number;
  cryptoCurrency: string;
  blockchainName: string;
};


const DialogCreatePrizeLottery = ({
    isCreatePrizeLotteryOpen,
    setIsCreatePrizeLotteryOpen,
    handleCreatePrizeLottery,
}: {
    isCreatePrizeLotteryOpen: boolean;
    setIsCreatePrizeLotteryOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreatePrizeLottery: (data: PrizeFormValues) => void;
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<PrizeFormValues>({
    defaultValues: {
      prizeName: "",
      prizeType: PrizeTypeEnum.TOKEN,
      amountAwarded: 0,
      probability: 0,
      cryptoCurrency:CryptoCurrencyEnum.SOL,
      blockchainName: BlockchainNameEnum.SOLANA,
    },
  });


  const onSubmit = (data: PrizeFormValues) => {
    handleCreatePrizeLottery(data);
    reset();
    setIsCreatePrizeLotteryOpen(false);
  };
useEffect(() => {
    if (!isCreatePrizeLotteryOpen) {
      reset();
    }
  }, [isCreatePrizeLotteryOpen, reset]);
  return (
    <Dialog open={isCreatePrizeLotteryOpen} onOpenChange={setIsCreatePrizeLotteryOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Prize lottery</DialogTitle>
          <DialogDescription>Select the game and fill in prize details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
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
              <GenericSelectContent options={PRIZE_TYPE_LOTTERY_OPTIONS} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="amountAwarded" className="text-right min-w-[120px]">Amount</Label>
            <Input id="amountAwarded" type="number" {...register("amountAwarded", { valueAsNumber: true })} className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>

          <div className="flex items-center gap-4">
            <Label className="text-right min-w-[120px]">Crypto</Label>
            <Select
              value={watch("cryptoCurrency")}
              onValueChange={(value) => setValue("cryptoCurrency", value as PrizeFormValues["cryptoCurrency"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <GenericSelectContent options={CRYPTO_OPTIONS} />
            </Select>
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
            <div className="flex items-center gap-4">
                <Label htmlFor="probability" className="text-right min-w-[120px]">Probability</Label>
                <Input
                    id="probability"
                    type="number"
                    step="any"
                    min="0"
                    {...register("probability", {
                    valueAsNumber: true,
                    min: 0,
                    })}
                    className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>


          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsCreatePrizeLotteryOpen(false)}>Cancel</Button>
            <Button type="submit">Create Prize</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreatePrizeLottery;
