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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNFTApi } from '@/services/nfts';
import PaginationTable from '@/components/pagination-table';
import Image from '@/components/image';
import { NFT } from '@/interfaces/nfts';
import { Season } from '@/interfaces/seasons';
import DialogEditNFT from './dialog-edit-nft';
import fallbackImg from '@/assets/images/image-placeholder.svg'
import { toast } from 'sonner';
import { ConfirmDeleteDialog } from '@/components/pages/seasons/dialog-delete';

const DialogEditSeason = React.memo(
  ({
    isEditSeasonOpen,
    setIsEditSeasonOpen,
    currentSeason,
    handleEditSeason,
  }: {
    isEditSeasonOpen: boolean;
    setIsEditSeasonOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentSeason: Season | null;
    handleEditSeason: (formData: any) => Promise<void>;
  }) => {
    const [isEditNFTOpen, setIsEditNFTOpen] = useState(false);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    
    const nftApi = useMemo(() => createNFTApi(), [])
    const { register, handleSubmit, reset } = useForm(
      {
        defaultValues: currentSeason || {},
      }
    );
    const [currentNFT, setCurrentNFT] = useState<NFT | null>(null);
    const { useGetAllNFTQuery, useUpdateNFTMutation, useDeleteNFTMutation } = nftApi;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {
      data: NFTData,
      isLoading: isNFTLoading,
      error: NFTError,
    } = useGetAllNFTQuery({
      page: currentPage,
      limit: itemsPerPage,
      seasonId: currentSeason?._id,
    });
    const [updateNFT] = useUpdateNFTMutation();
    const [deleteNFT] = useDeleteNFTMutation();
    const handleEditNFT = useCallback(
      async (formData: any) => {
        if (!currentNFT) return;
        try {
          await updateNFT({
            id: currentNFT._id,
            data: formData,
          }).unwrap();
          setCurrentNFT(null);
          setIsEditNFTOpen(false);
        } catch (err) {
          toast.error("Failed to create NFT!");
          console.error("Update game failed:", err);
        }
      },
      [currentNFT, updateNFT, setIsEditNFTOpen]
    );
    const handleConfirmDelete = async () => {
       if (!currentNFT) return;
       try {
         await deleteNFT({ id: currentNFT._id }).unwrap();
   
       } catch {
         toast.error("Error while deleting Season");
       } finally {
         setDialogDeleteOpen(false);
         setCurrentNFT(null);
       }
     };

    const NFTitems = useMemo(() => NFTData?.data?.items || [], [NFTData]);
    const NFTTotal = useMemo(() => NFTData?.data?.total || 0, [NFTData]);

    useEffect(() => {
      reset({
        ...currentSeason,
      });
    }, [currentSeason, reset]);

    useEffect(() => {
      if (!isEditSeasonOpen) {
        reset();
      }
    }, [isEditSeasonOpen, reset]);
    const handleOpenEditNFTDialog = (nft: NFT) => {
      setCurrentNFT(nft);
      setIsEditNFTOpen(true);
    };
    const handleOpenDeleteNFTDialog = (nft: NFT) => {
      setCurrentNFT(nft);
      setDialogDeleteOpen(true);
    };
    if (!currentSeason) return null;
    return (
      <>
        <Dialog open={isEditSeasonOpen} onOpenChange={setIsEditSeasonOpen}>
          <DialogContent className='w-full max-w-5xl max-h-[70vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Edit Season</DialogTitle>
              <DialogDescription>
                Modify Season information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleEditSeason)}>
              <div className='grid grid-cols-3 gap-4 py-4'>
                <Field label='Name'>
                  <Input {...register('name')} />
                </Field>
                <Field label='Description'>
                  <Textarea {...register('description')} />
                </Field>
                <Field label='Image URL'>
                  <Input {...register('imageUrl')} />
                </Field>
        
              </div>
              <div className="mt-4">
                  <Label className="text-md font-semibold">NFT</Label>
                  {isNFTLoading ? (
                    <p className="text-muted-foreground text-sm mt-2">
                      Loading NFT...
                    </p>
                  ) : NFTError ? (
                    <p className="text-destructive text-sm mt-2">
                      Failed to load NFT.
                    </p>
                  ) : NFTTotal ? (
                    <>
                    {
                      NFTitems.map((nft:NFT) => (
                        <Collapsible key={nft?._id}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                            <span>
                            {nft.name}
                            </span>
                          <div className='flex items-center gap-3'>
                            {
                              nft.isActive && <>
                              <Button type='button' onClick={(e)=>{
                                e.stopPropagation();
                                handleOpenEditNFTDialog(nft)
                                }}>Edit</Button>
                              <Button variant="ghost" className="text-red-500 hover:bg-red-500  hover:text-white" type='button' onClick={(e)=>{
                                e.stopPropagation();
                                handleOpenDeleteNFTDialog(nft)
                                }}>Delete</Button>
                              </>
                            }
                            <ChevronDown className="w-4 h-4" />
                          </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                            <div className="grid grid-cols-2 gap-5">
                              <div className='col-span-1'>
                                <Image fallbackSrc={fallbackImg} className='rounded-lg' src={nft?.image || fallbackImg} alt={currentSeason.name}/>
                              </div>
                              <div className="col-span-1 flex flex-col gap-2">
                                <div className='flex justify-between gap-2'>
                                    <span className="font-medium">Name:</span>
                                    <span>{nft.name}</span>
                                </div>
                                <div className='flex justify-between gap-2'>
                                  <span className="font-medium">Description:</span>
                                  <span>{nft.description}</span>
                                </div>
                                <div className='flex justify-between gap-2'>
                                  <span className="font-medium">Price:</span>
                                  <span>${nft.priceUsd}</span>
                                </div>
                                <div className='flex justify-between gap-2'>
                                  <span className="font-medium">Active:</span>
                                  <span>{nft.isActive ? "Yes" : "No"}</span>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))
                    }
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground min-w-[200px]">
                          <>
                            Showing {NFTitems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                            {Math.min((currentPage - 1) * itemsPerPage + NFTitems.length, NFTTotal)} of {NFTTotal}
                          </>
                      </div>
                      <div className='w-fit'>
                        <PaginationTable
                          currentPage={currentPage}
                          totalPages={Math.floor(NFTTotal / itemsPerPage)}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm mt-2">
                      No NFT found.
                    </p>
                  )}
                </div>

              <DialogFooter className='mt-6'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() =>{
                    setIsEditSeasonOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit'>Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <DialogEditNFT
          isEditNFTOpen={isEditNFTOpen} 
          handleEditNFT={handleEditNFT} 
          setIsEditNFTOpen={setIsEditNFTOpen} 
          currentNFT={currentNFT} 
        />
        <ConfirmDeleteDialog
          open={dialogDeleteOpen}
          content={currentNFT?.name}
          onClose={() => setDialogDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </>
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

export default DialogEditSeason;
