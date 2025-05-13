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
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import MultiSelectField from "@/components/multi-select";
import { BLOCKCHAIN_OPTIONS, CRYPTO_OPTIONS, PRIZE_TYPE_OPTIONS } from "@/constants/games";
import { useGetAllLotteryPrizesQuery } from "@/services/games";



const DialogEditGame = React.memo(
  ({
    isEditGameOpen,
    setIsEditGameOpen,
    currentGame,
    handleEditGame,
  }: {
    isEditGameOpen: boolean;
    setIsEditGameOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentGame: Game | null;
    handleEditGame: (formData: any) => Promise<void>;
  }) => {
    const { register, control, handleSubmit, reset, watch, setValue } = useForm({
      defaultValues: currentGame || {},
    });

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

    useEffect(() => {
      if (currentGame) {
        if (currentGame.gameId === 1 && lotteryPrizesData?.data?.data) {
          reset({
            ...currentGame,
            difficultyLevels: currentGame.difficultyLevels || [],
            prizes: lotteryPrizesData.data.data,
          });
        } else {
          reset({
            ...currentGame,
            difficultyLevels: currentGame.difficultyLevels || [],
            prizes: currentGame.prizes || [],
          });
        }
      }
    }, [currentGame, lotteryPrizesData, reset]);

    const { fields } = useFieldArray({
      control,
      name: "prizes",
    });

    if (!currentGame) return null;

    return (
      <Dialog open={isEditGameOpen} onOpenChange={setIsEditGameOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogDescription>
              Modify game information and prizes. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleEditGame)}>
            <div className="grid grid-cols-3 gap-4 py-4">
              <Field label="Title">
                <Input {...register("title")} />
              </Field>
              <Field label="Description">
                <Textarea {...register("description")} />
              </Field>
              <Field label="Category">
                <Input {...register("category")} />
              </Field>
              <Field label="URL">
                <Input {...register("url")} />
              </Field>
              <Field label="Image URL">
                <Input {...register("imageUrl")} />
              </Field>
              <div className="flex items-center gap-4">
                <Label className="text-right min-w-[120px]">Difficulty</Label>
                <MultiSelectField
                  selected={watch("difficultyLevels")}
                  onChange={(vals) => setValue("difficultyLevels", vals as any)}
                />
              </div>

              <Field label="Active">
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(val) => field.onChange(val === "true")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <GenericSelectContent options={STATUS_OPTIONS} />
                    </Select>
                  )}
                />
              </Field>
              <Field label="Required Points">
                <Input
                  type="number"
                  {...register("requiredPoints")}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </Field>
            </div>

            <Field label="Rules">
              <Textarea {...register("rules")} />
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
              ) : fields.length > 0 ? (
                fields.map((prize, index) => (
                  <Collapsible key={prize._id}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                      <span>
                      {prize.prizeName}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-s2 px-4 pb-2 text-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Prize Name">
                          <Input
                            {...register(`prizes.${index}.prizeName`)}
                          />
                        </Field>
                        <Field label="Prize Type">
                          <Controller
                            name={`prizes.${index}.prizeType`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={(val) => field.onChange(val)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select prize type" />
                                </SelectTrigger>
                                <GenericSelectContent options={PRIZE_TYPE_OPTIONS} />
                              </Select>
                            )}
                          />
                        </Field>
                        <Field label="Amount Awarded">
                          <Input
                            type="number"
                            {...register(`prizes.${index}.amountAwarded`)}
                            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </Field>
                        <Field label="Crypto Currency">
                        <Select
                          value={watch(`prizes.${index}.cryptoCurrency`)}
                          onValueChange={(value) =>
                            setValue(`prizes.${index}.cryptoCurrency`, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select crypto" />
                          </SelectTrigger>
                          <GenericSelectContent options={CRYPTO_OPTIONS} />
                        </Select>
                      </Field>

                        <Field label="Blockchain">
                          <Select
                            value={watch(`prizes.${index}.blockchainName`)}
                            onValueChange={(value) => setValue(`prizes.${index}.blockchainName`, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select blockchain" />
                            </SelectTrigger>
                            <GenericSelectContent options={BLOCKCHAIN_OPTIONS} />
                          </Select>
                        </Field>

                        <Field label="Active">
                          <Controller
                            name={`prizes.${index}.active`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                value={field.value?.toString()}
                                onValueChange={(val) => field.onChange(val === "true")}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <GenericSelectContent
                                  options={[
                                    { value: "true", label: "Yes" },
                                    { value: "false", label: "No" },
                                  ]}
                                />
                              </Select>
                            )}
                          />
                        </Field>
                        <Field label="Probability">
                          <Input
                            {...register(`prizes.${index}.probability` as any)}
                          />
                        </Field>
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

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsEditGameOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
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

export default DialogEditGame;