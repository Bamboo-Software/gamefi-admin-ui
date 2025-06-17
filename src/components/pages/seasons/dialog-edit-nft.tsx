/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NFT } from '@/interfaces/nfts';
import fallbackImg from '@/assets/images/image-placeholder.svg'
import Image from '@/components/image';

const DialogEditNFT = React.memo(
  ({
    isEditNFTOpen,
    setIsEditNFTOpen,
    currentNFT,
    handleEditNFT,
  }: {
    isEditNFTOpen: boolean;
    setIsEditNFTOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentNFT: NFT | null;
    handleEditNFT: (formData: any) => Promise<void>;
  }) => {
    const { register, handleSubmit, reset } = useForm(
      {
        defaultValues: currentNFT || {},
      }
    );

    useEffect(() => {
      reset({
        ...currentNFT,
      });
    }, [currentNFT, reset]);

    useEffect(() => {
      if (!isEditNFTOpen) {
        reset();
      }
    }, [isEditNFTOpen, reset]);

    if (!currentNFT) return null;
    return (
      <Dialog open={isEditNFTOpen} onOpenChange={setIsEditNFTOpen}>
        <DialogContent className='w-full max-w-5xl max-h-[70vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit NFT</DialogTitle>
            <DialogDescription>
              Modify NFT information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleEditNFT)}>
            <div className='grid grid-cols-2 gap-5'>
              <div className='col-span-1'>
                <Image  height={500} className='rounded-lg' src={currentNFT?.image || fallbackImg} alt={currentNFT.name}/>
              </div>

              <div className='flex flex-col gap-3 col-span-1'>
                <Field label='Name'>
                  <Input {...register('name')} />
                </Field>
                <Field label='Description'>
                  <Textarea {...register('description')} />
                </Field>
                <Field label='Image URL'>
                  <Input {...register('image')} />
                </Field>
              </div>
            </div>

            <DialogFooter className='mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() =>{
                  setIsEditNFTOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit'>Save Changes</Button>
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
  <div className='flex flex-col gap-1'>
    <Label className='text-sm font-semibold'>{label}</Label>
    {children}
  </div>
);

export default DialogEditNFT;
