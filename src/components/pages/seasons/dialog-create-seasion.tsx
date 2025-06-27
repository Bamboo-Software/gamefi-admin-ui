/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import GenericSelectContent from '@/components/select-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useModulePrefix } from '@/hooks/useModulePrefix';
import { createGameApi } from '@/services/games';
import { CreateSeasonRequest } from '@/interfaces/seasons';
import { DatePicker } from '@/components/ui/datePicker';

const DialogCreateSeason = ({
  isCreateSeasonOpen,
  setIsCreateSeasonOpen,
  handleCreateSeason,
}: {
  isCreateSeasonOpen: boolean;
  setIsCreateSeasonOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateSeason: (data: any) => Promise<void>;
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefix = useModulePrefix();
  const gameApi = useMemo(() => createGameApi(prefix), [prefix]);
  const { useGetAllGamesQuery } = gameApi;
  const { data: gameData, isLoading } = useGetAllGamesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<CreateSeasonRequest>({
      defaultValues: {
        gameId: 0,
        name: '',
        description: '',
        imageUrl: '',
        collectionNFTName: '',
        collectionNFTSymbol: '',
        requireNFT: false,
      },
    });

  const onSubmit = async (formData: CreateSeasonRequest) => {
    if (formData.requireNFT) {
      if (
        !formData.nftQuantity
      ) {
        alert('NFT quantity must be greater than 0');
        return;
      }
      if (!formData.nftPrice || !formData.nftQuantity || formData.nftQuantity <=0 || formData.nftPrice <= 0) {
        alert('NFT price must be greater than 0');
        return;
      }
    } else {
      delete formData.nftQuantity;
      delete formData.nftPrice;
    }

    setIsSubmitting(true);
    await handleCreateSeason(formData);
    reset();
    setIsCreateSeasonOpen(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!isCreateSeasonOpen) {
      reset();
    }
  }, [isCreateSeasonOpen, reset]);

  const GAME_OPTIONS = gameData?.data?.items
    ?.filter((game: Game) => game.gameId !== 1)
    .map((game: Game) => ({
      label: game.title,
      value: String(game.gameId),
    }));
  return (
    <Dialog open={isCreateSeasonOpen} onOpenChange={setIsCreateSeasonOpen}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create Season</DialogTitle>
          <DialogDescription>
            Fill in the information to create a new season.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 py-4'
        >
          <div className='flex items-center gap-4'>
            <Label htmlFor='gameId' className='text-right min-w-[120px]'>
              Game
            </Label>
            <Select
              value={watch('gameId')?.toString()}
              onValueChange={(value) => setValue('gameId', Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={isLoading ? 'Loading games...' : 'Select game'}
                />
              </SelectTrigger>
              <GenericSelectContent options={GAME_OPTIONS ?? []} />
            </Select>
          </div>

          <div className='flex items-center gap-4'>
            <Label htmlFor='name' className='text-right min-w-[120px]'>
              Name
            </Label>
            <Input id='name' {...register('name')} placeholder='Enter name' />
          </div>

          <div className='flex items-center gap-4'>
            <Label htmlFor='description' className='text-right min-w-[120px]'>
              Description
            </Label>
            <Input
              id='description'
              {...register('description')}
              placeholder='Enter description'
            />
          </div>

          <div className='flex items-center gap-4'>
            <Label htmlFor='imageUrl' className='text-right min-w-[120px]'>
              Image URL
            </Label>
            <Input
              id='imageUrl'
              {...register('imageUrl')}
              placeholder='Enter image URL'
            />
          </div>
          <div className='flex items-center gap-4'>
            <Label htmlFor='collectionNFTName' className=' min-w-[120px]'>
              NFT Collection Name
            </Label>
            <Input
              id='collectionNFTName'
              {...register('collectionNFTName')}
              placeholder='Enter NFT Collection Name'
            />
          </div>

          <div className='flex items-center gap-4'>
            <Label htmlFor='collectionNFTSymbol' className=' min-w-[120px]'>
              NFT Collection Symbol
            </Label>
            <Input
              id='collectionNFTSymbol'
              {...register('collectionNFTSymbol')}
              placeholder='Enter NFT Collection Symbol'
            />
          </div>

     

          <div className='flex items-center gap-4'>
            <Label htmlFor='startDate' className='text-right min-w-[120px]'>
              Start Date
            </Label>
            <DatePicker
              value={watch('startDate')}
              onChange={(val) => setValue('startDate', val?.toISOString())}
              name='startDate'
            />
          </div>

          <div className='flex items-center gap-4'>
            <Label htmlFor='endDate' className='text-right min-w-[120px]'>
              End Date
            </Label>
            <DatePicker
              value={watch('endDate')}
              onChange={(val) => setValue('endDate', val?.toISOString())}
              name='endDate'
            />
          </div>

     <div className='flex items-center gap-4'>
            <Label htmlFor='active' className='text-right min-w-[120px]'>
              NFT required
            </Label>
            <Select
              value={watch('requireNFT')?.toString()}
              onValueChange={(value) =>
                setValue('requireNFT', value === 'true')
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Require NFT' />
              </SelectTrigger>
              <GenericSelectContent
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
            </Select>
          </div>

          {watch('requireNFT') && (
            <>
              <div className='flex items-center gap-4'>
                <Label
                  htmlFor='nftQuantity'
                  className='text-right min-w-[120px]'
                >
                  NFT Quantity
                </Label>
                <Input
                  id='nftQuantity'
                  type='number'
                  min={1}
                  {...register('nftQuantity', { valueAsNumber: true })}
                  placeholder='Enter quantity (max 100)'
                />
              </div>

              <div className='flex items-center gap-4'>
                <Label htmlFor='nftPrice' className='text-right min-w-[120px]'>
                  NFT Price (USD)
                </Label>
                <Input
                  id='nftPrice'
                  type='number'
                  step='0.00001'
                  min={0}
                  {...register('nftPrice', { valueAsNumber: true })}
                  placeholder='Enter price'
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button
              variant='outline'
              type='button'
              onClick={() => setIsCreateSeasonOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              Create Season
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateSeason;
