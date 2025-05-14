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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GenericSelectContent from "@/components/select-table";
import { STATUS_OPTIONS } from "@/constants/user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useGetAllLotteryPrizesQuery } from "@/services/games";



const DialogViewGame = React.memo(
  ({
    isViewGameOpen,
    setIsViewGameOpen,
    currentGame,
  }: {
    isViewGameOpen: boolean;
    setIsViewGameOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentGame: Game | null;
  }) => {

    const { data: lotteryPrizesData, isLoading: isPrizesLoading, error: prizesError } =
      useGetAllLotteryPrizesQuery(
        {
          page: 1,
          limit: 10,
        },
        {
          skip: !currentGame || currentGame.gameId !== 1,
        }
      );
    const prizes = currentGame?.gameId === 1
      ? lotteryPrizesData?.data?.items || []
      : currentGame?.prizes || [];

    return (
      <Dialog open={isViewGameOpen} onOpenChange={setIsViewGameOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Game Details</DialogTitle>
            <DialogDescription>
              View all information about the game and prizes in readonly mode.
            </DialogDescription>
          </DialogHeader>
          {currentGame ? (
            <>
              <div className="max-h-[70vh] overflow-y-auto grid grid-cols-3 gap-4 py-4">
                <Field label="Title">
                  <Input value={currentGame.title} disabled />
                </Field>
                <Field label="Description">
                  <Textarea value={currentGame.description} disabled />
                </Field>
                <Field label="Category">
                  <Input value={currentGame.category} disabled />
                </Field>
                <Field label="URL">
                  <Input value={currentGame.url} disabled />
                </Field>
                <Field label="Image URL">
                  <Input value={currentGame.imageUrl} disabled />
                </Field>
                <Field label="Difficulty Levels">
                  <Input
                    value={currentGame.difficultyLevels.join(", ")}
                    disabled
                  />
                </Field>
                <Field label="Active">
                  <Select value={currentGame.active.toString()} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <GenericSelectContent options={STATUS_OPTIONS} />
                  </Select>
                </Field>
                <Field label="Required Points">
                  <Input value={currentGame.requiredPoints} disabled />
                </Field>
              </div>
              <Field label="Rules">
                <Textarea value={currentGame.rules} disabled />
              </Field>
              <div className="mt-4">
                <Label className="text-md font-semibold">Prizes</Label>
                {currentGame.gameId === 1 && isPrizesLoading ? (
                  <p className="text-muted-foreground text-sm mt-2">
                    Loading prizes...
                  </p>
                ) : currentGame.gameId === 1 && prizesError ? (
                  <p className="text-destructive text-sm mt-2">
                    Failed to load prizes.
                  </p>
                ) : prizes.length > 0 ? (
                  prizes.map((prize:any) => (
                    <Collapsible key={prize?._id}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                        <span>
                         {prize.prizeName}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <span className="font-medium">Prize Name:</span>
                          <span>{prize.prizeName}</span>
                          <span className="font-medium">Prize Type:</span>
                          <span>{prize.prizeType}</span>
                          <span className="font-medium">Amount Awarded:</span>
                          <span>{prize.amountAwarded}</span>
                          <span className="font-medium">Crypto Currency:</span>
                          <span>{prize.cryptoCurrency}</span>
                          <span className="font-medium">Blockchain:</span>
                          <span>{prize.blockchainName}</span>
                          <span className="font-medium">Active:</span>
                          <span>{prize.active ? "Yes" : "No"}</span>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm mt-2">
                    No prizes found.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              No game data available.
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewGameOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <Label className="text-sm font-semibold">{label}</Label>
    {children}
  </div>
);

export default DialogViewGame;