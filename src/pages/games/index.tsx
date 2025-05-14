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

  Download,
  ListPlus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCreateGameMutation, useCreatePrizeGameMutation, useCreatePrizeLotteryMutation, useDeleteGameMutation, useGetAllGamesQuery, useUpdateGameMutation } from "@/services/games";
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
import { CATEGORY_OPTIONS, getGameCellConfigs, TABLE_HEADERS_GAME } from "@/constants/games";
import TableGameGenericCell from "@/components/pages/games/game-cell";
import DialogEditGame from "@/components/pages/games/dialog-edit";
import { ConfirmDeleteDialog } from "@/components/pages/games/dialog-delete";
import DialogCreateGame from "@/components/pages/games/dialog-create-game";
import DialogViewGame from "@/components/pages/games/dialog-view";
import DialogCreatePrize from "@/components/pages/games/dialog-create-prize-game";
import DialogCreatePrizeLottery from "@/components/pages/games/dialog-create-prize-lottery";
const PaginationTable = React.lazy(() => import("@/components/pagination-table"));
const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ASC" | "DESC" } | null>(null);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  //filter
  const [filters, setFilters] = useState({
    active: "",
    category: "",
  });
  //view
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const [isEditGameOpen, setIsEditGameOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [isCreatePrizeGameOpen, setIsCreatePrizeGameOpen] = useState(false);
  const [isCreatePrizeLotteryOpen, setIsCreatePrizeLotteryOpen] = useState(false);
  const [isViewGameOpen, setIsViewGameOpen] = useState(false);
  const [createGame] = useCreateGameMutation();
  const [createPrizeGame] = useCreatePrizeGameMutation();
  const [createPrizeLottery] = useCreatePrizeLotteryMutation();
  const debouncedSetSearchTerm = useMemo(
        () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
        []
    );
    const queryParams = useMemo(() => {
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      title: debouncedSearchTerm,
      q: debouncedSearchTerm,
      active: filters.active,
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
  const { data:gameData, isLoading } = useGetAllGamesQuery(queryParams);
  const [updateGame] = useUpdateGameMutation();
  const [deleteGameMutation] = useDeleteGameMutation();
  const handleOpenDeleteDialog = (Game: Game) => {
    setCurrentGame(Game);
    setDialogDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!currentGame) return;
    try {
      await deleteGameMutation({ id: currentGame._id, removePrizes: true }).unwrap();

    } catch {
      toast.error("Error while deleting Game");
    } finally {
      setDialogDeleteOpen(false);
      setCurrentGame(null);
    }
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);
  const handleSelectGame = useCallback((userId: string) => {
      setSelectedGames((prev) =>
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
    const handleEditGame = useCallback(
      async (formData: any) => {
        if (!currentGame) return;
        try {
          await updateGame({
            id: currentGame._id,
            data: formData,
          }).unwrap();
          setCurrentGame(null);
          setIsEditGameOpen(false);
        } catch (err) {
          console.error("Update game failed:", err);
        }
      },
      [currentGame, updateGame, setIsEditGameOpen]
    );
    const memoizedGames = useMemo(() => games, [games]);

  const handleDeleteSelected = () => {
    setGames(games.filter(Game => !selectedGames.includes(Game._id)));
    setSelectedGames([]);
  };
  const handleCreateGame = async (data: any) => {
    try {
      await createGame(data).unwrap();
      toast.success("Game created successfully!");
      setIsCreateGameOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Game!");
    }
  };
  const handleCreatePrizeGame = async (data: any) => {
    try {
      await createPrizeGame(data).unwrap();
      toast.success("Game created successfully!");
      setIsCreatePrizeGameOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Game!");
    }
  };
  const handleCreatePrizeLottery = async (data: any) => {
    try {
      await createPrizeLottery(data).unwrap();
      toast.success("Game created successfully!");
      setIsCreatePrizeLotteryOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Game!");
    }
  };
  const handleOpenCreateGameDialog = () => {
    setIsCreateGameOpen(true);
  };
  const handleOpenCreatePrizeGameDialog = () => {
    setIsCreatePrizeGameOpen(true);
  };
  const handleOpenCreatePrizeLotteryDialog = () => {
    setIsCreatePrizeLotteryOpen(true);
  };
  const handleActiveChange = (value: string) => {
    setFilters((prev) => ({ ...prev, active: value }));
  };
  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };
  console.log("🚀 ~ useEffect ~ gameData:", gameData)
useEffect(() => {
    if (gameData?.data && gameData?.data?.items) {
      setGames(gameData?.data?.items);
      setTotal(gameData?.data.total);
    } else {
      setGames([]);
      setTotal(0);
    }
}, [gameData]);
  useEffect(() => {
      const maxPage = Math.ceil(total / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
  }, [total, itemsPerPage, currentPage]);
  const memoizedGetCellConfigs = useCallback(
    (game: Game, utils: any) => getGameCellConfigs(game, utils),
    []
  );
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <PageHeading
          title="Games Management"
          subtitle="Manage your games"
      />
        <div className="flex items-center gap-2">
          <Button  onClick={handleOpenCreatePrizeLotteryDialog} className="cursor-pointer">
              <ListPlus className="h-4 w-4 mr-2" />
                Add Prize Lottery
          </Button>
          <Button  onClick={handleOpenCreatePrizeGameDialog} className="cursor-pointer">
            <ListPlus className="h-4 w-4 mr-2" />
              Add Prize Game
          </Button>
          <Button onClick={handleOpenCreateGameDialog} className="cursor-pointer">
            <ListPlus className="h-4 w-4 mr-2" />
              Add Game
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
        <SectionHeader
          title="Games"
          description="Manage your organization's games, game prize, and game description."
        />
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
              <div className="flex gap-4">
                <SearchInput placeholder={"Search Game..."} searchTerm={searchTerm} onChange={handleChange} />
                <Select value={filters.active} onValueChange={handleActiveChange}>
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <GenericSelectContent options={STATUS_OPTIONS} />
                </Select>
                <Select value={filters.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <GenericSelectContent options={CATEGORY_OPTIONS} />
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
          {selectedGames.length > 0 && (
            <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
              <p className="text-sm">{selectedGames.length} users selected</p>
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
          <AdminTable<Game>
            data={memoizedGames}
            selectedUsers={selectedGames}
            sortConfig={sortConfig}
            isLoading={isLoading}
            handleSelect={handleSelectGame}
            handleDelete={handleOpenDeleteDialog}
            setCurrent={setCurrentGame}
            setIsEditOpen={setIsEditGameOpen}
            setIsViewOpen={setIsViewGameOpen}
            getStatusColor={getStatusColor}
            handleSort={handleSort}
            getCellConfigs={memoizedGetCellConfigs}
            renderCell={(config, idx) => <TableGameGenericCell key={idx} {...config} />}
            columns={TABLE_HEADERS_GAME}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground min-w-[200px]">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  Showing {games.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                  {Math.min((currentPage - 1) * itemsPerPage + games.length, total)} of {total}
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
      <DialogEditGame isEditGameOpen={isEditGameOpen} handleEditGame={handleEditGame} setIsEditGameOpen={setIsEditGameOpen} currentGame={currentGame} />
      <ConfirmDeleteDialog
        open={dialogDeleteOpen}
        username={currentGame?.title}
        onClose={() => setDialogDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <DialogCreateGame
        isCreateGameOpen={isCreateGameOpen}
        setIsCreateGameOpen={setIsCreateGameOpen}
        handleCreateGame={handleCreateGame}
      />
     <DialogViewGame
        isViewGameOpen={isViewGameOpen}
        setIsViewGameOpen={setIsViewGameOpen}
        currentGame={currentGame}
      />
      <DialogCreatePrize isCreatePrizeGameOpen={isCreatePrizeGameOpen}
        setIsCreatePrizeGameOpen={setIsCreatePrizeGameOpen}
        handleCreatePrizeGame={handleCreatePrizeGame}/>
      <DialogCreatePrizeLottery isCreatePrizeLotteryOpen={isCreatePrizeLotteryOpen}
        setIsCreatePrizeLotteryOpen={setIsCreatePrizeLotteryOpen}
        handleCreatePrizeLottery={handleCreatePrizeLottery}
      />
    </div>
  );
};

export default Games;