import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";


export const createGameApi = (prefix:string) => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createPrizeGame: builder.mutation<GameLeaderboardPrize, Partial<GameLeaderboardPrize>>({
        query: (data) => ({
          url: `${prefix}/prize-games`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.GAME],
      }),
      createPrizeLottery: builder.mutation<LotteryPrize, Partial<LotteryPrize>>({
        query: (data) => ({
          url: `${prefix}/lottery-prizes`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.GAME],
      }),
      createGame: builder.mutation<Game, Partial<Game>>({
        query: (data) => ({
          url: `${prefix}/games`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.GAME],
      }),
      getAllLotteryPrizes: builder.query<
        ApiResponse<PaginatedResponse<LotteryPrize[]>>,
        {
          page?: number;
          q?: string;
          limit?: number;
          active?: string;
          offset?: number;
          orderField?: string;
          orderDirection?: string;
        }
      >({
        query: ({ page, limit, offset, q, orderField, orderDirection, active }) => ({
          url: `${prefix}/lottery-prizes`,
          method: "GET",
          params: {
            page,
            limit,
            offset,
            q,
            orderField,
            orderDirection,
            active,
          },
        }),
        providesTags: [InvalidatesTagsEnum.GAME],
      }),
      getAllGames: builder.query<
        ApiResponse<PaginatedResponse<Game[]>>,
        | {
            page?: number;
            q?: string;
            title?: string;
            email?: string;
            limit?: number;
            active?: string;
            offset?: number;
            category?: string;
            orderField?: string;
            orderDirection?: string;
            username?: string;
          }
        | void
      >({
        query: (params) => ({
          url: `${prefix}/games`,
          method: "GET",
          params: {
            ...(params ?? {}),
          },
        }),
        providesTags: [InvalidatesTagsEnum.GAME],
      }),
      getGameDetail: builder.query<Game, string>({
        query: (gameId) => ({
          url: `${prefix}/games/${gameId}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.GAME],
      }),
      updateGame: builder.mutation<Game, { id: string; data: Partial<Game> }>({
        query: ({ id, data }) => ({
          url: `${prefix}/games/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.GAME],
      }),
      deleteGame: builder.mutation<void, { id: string; removePrizes: boolean }>({
        query: ({ id, removePrizes }) => ({
          url: `${prefix}/games/${id}`,
          method: "DELETE",
          params: { removePrizes },
        }),
        invalidatesTags: [InvalidatesTagsEnum.GAME],
      }),
    }),
  });
};

