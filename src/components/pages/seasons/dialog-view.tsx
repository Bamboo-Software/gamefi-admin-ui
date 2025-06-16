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
import React, { useMemo, useState } from "react";
import { createNFTApi } from '@/services/nfts';
import { Season } from '@/interfaces/seasons';
import PaginationTable from '@/components/pagination-table';
import Image from '@/components/image';
import { NFT } from '@/interfaces/nfts';
import fallbackImg from '@/assets/images/image-placeholder.svg'


const DialogViewSeason = React.memo(
  ({
    isViewSeasonOpen,
    setIsViewSeasonOpen,
    currentSeason,
  }: {
    isViewSeasonOpen: boolean;
    setIsViewSeasonOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentSeason: Season | null;
  }) => {
    const nftApi = useMemo(() => createNFTApi(), []);
    const { useGetAllNFTQuery } = nftApi;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { data: NFTData, isLoading: isNFTLoading, error: NFTError } =
      useGetAllNFTQuery(
        {
          page: currentPage,
          limit: itemsPerPage,
          seasonId: currentSeason?._id
        },
      );

    const NFTitems = useMemo(()=> NFTData?.data?.items || [], [NFTData])
    const NFTTotal = useMemo(()=> NFTData?.data?.total || 0, [NFTData])


    return (
      <Dialog open={isViewSeasonOpen} onOpenChange={setIsViewSeasonOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Season Details</DialogTitle>
            <DialogDescription>
              View all information about the Season and NFT in readonly mode.
            </DialogDescription>
          </DialogHeader>
          {currentSeason ? (
            <>
              <div className='grid grid-cols-3 gap-5'>
                <div className="col-span-1">
                  <Image fallbackSrc={fallbackImg} className='rounded-lg' src={currentSeason?.imageUrl || fallbackImg} alt={currentSeason.name}/>
                </div>
                <div className='col-span-2'>
                  <div className="max-h-[70vh] overflow-y-auto grid grid-cols-2 gap-4 py-4">
                    <Field label="Title">
                      <Input value={currentSeason.name} disabled />
                    </Field>
                    <Field label="Description">
                      <Textarea value={currentSeason.description} disabled />
                    </Field>
                    <Field label="Image URL">
                      <Input value={currentSeason.imageUrl} disabled />
                    </Field>
                    <Field label="Active">
                      <Select value={currentSeason.isActive.toString()} disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <GenericSelectContent options={STATUS_OPTIONS} />
                      </Select>
                    </Field>
                  </div>
                </div>
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
                          <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                          <div className="grid grid-cols-2 gap-5">
                            <div className='col-span-1'>
                              <Image className='rounded-lg' src={currentSeason?.imageUrl || ''} alt={currentSeason.name}/>
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
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              No game data available.
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewSeasonOpen(false)}>
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

export default DialogViewSeason;