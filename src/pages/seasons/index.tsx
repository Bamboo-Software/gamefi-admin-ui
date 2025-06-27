/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {

  ListPlus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { AdminTable } from "@/components/table-admin";
import { debounce } from "lodash";
import { LoadingSpinner } from "@/components/spinner";
import GenericSelectContent from "@/components/select-table";
import { ROW_OPTIONS } from "@/constants";
import { STATUS_OPTIONS } from "@/constants/user";
import SearchInput from "@/components/input-search";
import { toast } from "sonner";
import { PageHeading } from "@/components/page-heading";
import { SectionHeader } from "@/components/section-header";
import { getStatusColor } from "@/utils";
import { createSeasonApi } from '@/services/seasons';
import { Season } from '@/interfaces/seasons';
import TableSeasonGenericCell from '@/components/pages/seasons/season-cell';
import { getSeasonCellConfigs, TABLE_HEADERS_SEASON } from '@/constants/seasons';
import DialogViewSeason from '@/components/pages/seasons/dialog-view';
import DialogEditSeason from '@/components/pages/seasons/dialog-edit';
import { ConfirmDeleteDialog } from '@/components/pages/seasons/dialog-delete';
import DialogCreateSeason from '@/components/pages/seasons/dialog-create-seasion';
import DialogCreateNFT from '@/components/pages/seasons/dialog-create-nft';
import { createNFTApi } from '@/services/nfts';
const PaginationTable = React.lazy(() => import("@/components/pagination-table"));
const Seasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ASC" | "DESC" } | null>(null);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  //filter
  const [filters, setFilters] = useState({
    active: "",
    category: "",
  });
  //view
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [isEditSeasonOpen, setIsEditSeasonOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [isCreateSeasonOpen, setIsCreateSeasonOpen] = useState(false);
  const [isCreateNFTOpen, setIsCreateNFTOpen] = useState(false);
  const [isViewGameOpen, setIsViewGameOpen] = useState(false);
  const seasonApi = useMemo(() => createSeasonApi(), []);
  const nftApi = useMemo(() => createNFTApi(), []);
  const {useCreateNFTMutation} = nftApi
  const [createNFT] = useCreateNFTMutation();
  const {useGetAllSeasonQuery, useCreateSeasonMutation, useDeleteSeasonMutation, useUpdateSeasonMutation} = seasonApi;
  const [createGame] = useCreateSeasonMutation();
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
    []
  );
  const queryParams = useMemo(() => { 
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      title: debouncedSearchTerm,
      q: debouncedSearchTerm,
      ...(filters.active !== "all" ? { active: filters.active}: {}),
      category: filters.category,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "ASC",
    };
    const filteredParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) => value !== ""
      )
    );
    return filteredParams;
  }, [currentPage,filters, itemsPerPage, debouncedSearchTerm, sortConfig]);
  const { data:seasonData, isLoading } = useGetAllSeasonQuery(queryParams, {
    refetchOnMountOrArgChange:true
  });
  const [updateSeason] = useUpdateSeasonMutation();
  const [deleteSeasonMutation] = useDeleteSeasonMutation();
  const handleEditSeason = useCallback(
     async (formData: any) => {
       if (!currentSeason) return;
       try {
         await updateSeason({
           id: currentSeason._id,
           data: formData,
         }).unwrap();
         setCurrentSeason(null);
         setIsEditSeasonOpen(false);
       } catch (err) {
         console.error("Update game failed:", err);
       }
     },
     [currentSeason, updateSeason, setIsEditSeasonOpen]
   );

  const handleOpenDeleteDialog = (season: Season) => {
    setCurrentSeason(season);
    setDialogDeleteOpen(true);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);
  const handleSelectGame = useCallback((userId: string) => {
      setSelectedSeasons((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    }, []);
  const handleSort = useCallback((key: string) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return prev.direction === "ASC" ? { key, direction: "DESC" } : null;
        }
        return { key, direction: "ASC" };
      });
    }, []);
   
    const memoizedSeasons = useMemo(() => seasons, [seasons]);

  const handleDeleteSelected = () => {
    setSeasons(seasons.filter(Game => !selectedSeasons.includes(Game._id)));
    setSelectedSeasons([]);
  };
  const handleOpenCreateGameDialog = () => {
    setIsCreateSeasonOpen(true);
  };
 
  const handleActiveChange = (value: string) => {
    setFilters((prev) => ({ ...prev, active: value }));
  };
  useEffect(() => {
      if (seasonData?.data && seasonData?.data?.items) {
        setSeasons(seasonData?.data?.items);
        setTotal(seasonData?.data.total);
      } else {
        setSeasons([]);
        setTotal(0);
      }
  }, [seasonData]);
  useEffect(() => {
      const maxPage = Math.ceil(total / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
  }, [total, itemsPerPage, currentPage]);
  const memoizedGetCellConfigs = useCallback(
    (season: Season, utils: any) => getSeasonCellConfigs(season, utils),
    []
  );

  const handleConfirmDelete = async () => {
      if (!currentSeason) return;
      try {
        await deleteSeasonMutation({ id: currentSeason._id }).unwrap();
  
      } catch {
        toast.error("Error while deleting Season");
      } finally {
        setDialogDeleteOpen(false);
        setCurrentSeason(null);
      }
    };
    
  const handleCreateSeason = async (data: any) => {
    try {
      await createGame(data).unwrap();
      toast.success("Season created successfully!");
      setIsCreateSeasonOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Season!");
    }
  };

  const handleCreateNFTGame = async (data: any) => {
    try {
      await createNFT(data).unwrap();
      toast.success("NFT created successfully!");
      setIsCreateNFTOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create NFT!");
    }
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <PageHeading
          title="Season Management"
          subtitle="Manage your seasons"
      />
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenCreateGameDialog} className="cursor-pointer">
            <ListPlus className="h-4 w-4 mr-2" />
              Add Season
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
        <SectionHeader
          title="Seasons"
          description="Manage your organization's seasons, game prize, and game description."
        />
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
              <div className="flex gap-4">
                <SearchInput placeholder={"Search Season..."} searchTerm={searchTerm} onChange={handleChange} />
                <Select value={filters.active} onValueChange={handleActiveChange}>
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <GenericSelectContent options={STATUS_OPTIONS} />
                </Select>
             
              </div>
              <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setDebouncedSearchTerm("");
                  setSortConfig(null);
                  setFilters({
                    active: "",
                    category: "",
                  })
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] font-medium cursor-pointer">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <GenericSelectContent options={ROW_OPTIONS} />
              </Select>
              </div>
            </div>
        </CardHeader>
        <CardContent>
          {selectedSeasons.length > 0 && (
            <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
              <p className="text-sm">{selectedSeasons.length} users selected</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}
          <AdminTable<Season>
            data={memoizedSeasons}
            selectedUsers={selectedSeasons}
            sortConfig={sortConfig}
            isLoading={isLoading}
            handleSelect={handleSelectGame}
            handleDelete={handleOpenDeleteDialog}
            setCurrent={setCurrentSeason}
            setIsEditOpen={setIsEditSeasonOpen}
            setIsViewOpen={setIsViewGameOpen}
            getStatusColor={getStatusColor}
            handleSort={handleSort}
            getCellConfigs={memoizedGetCellConfigs}
            renderCell={(config, idx) => <TableSeasonGenericCell key={idx} {...config} />}
            columns={TABLE_HEADERS_SEASON}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground min-w-[200px]">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  Showing {seasons.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                  {Math.min((currentPage - 1) * itemsPerPage + seasons.length, total)} of {total}
                </>
              )}
            </div>
            <PaginationTable
              currentPage={currentPage}
              totalPages={Math.floor(total / itemsPerPage)}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
      <DialogEditSeason isEditSeasonOpen={isEditSeasonOpen} handleEditSeason={handleEditSeason} setIsEditSeasonOpen={setIsEditSeasonOpen} currentSeason={currentSeason} />
      <ConfirmDeleteDialog
        open={dialogDeleteOpen}
        content={currentSeason?.name}
        onClose={() => setDialogDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <DialogCreateSeason
        isCreateSeasonOpen={isCreateSeasonOpen}
        setIsCreateSeasonOpen={setIsCreateSeasonOpen}
        handleCreateSeason={handleCreateSeason}
      />
     <DialogViewSeason
        isViewSeasonOpen={isViewGameOpen}
        setIsViewSeasonOpen={setIsViewGameOpen}
        currentSeason={currentSeason}
      />
      <DialogCreateNFT isCreateNFTOpen={isCreateNFTOpen}
        setIsCreateNFTOpen={setIsCreateNFTOpen}
        handleCreateNFTGame={handleCreateNFTGame}/>
    </div>
  );
};

export default Seasons;