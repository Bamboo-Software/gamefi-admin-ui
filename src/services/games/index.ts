import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
const reducerPath = "gameApi";
const endpoint = "admin/lottery";

export const gameApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.GAME],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const storedToken = localStorage.getItem("auth-token");
      if (storedToken) {
        const cleanToken = storedToken.replace(/^"|"$/g, "");
        headers.set("Authorization", `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPrizeGame: builder.mutation<GameLeaderboardPrize, Partial<GameLeaderboardPrize>>({
      query: (data) => ({
        url: `${endpoint}/prize-games`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.GAME],
    }),
    createPrizeLottery: builder.mutation<LotteryPrize, Partial<LotteryPrize>>({
      query: (data) => ({
        url: `${endpoint}/lottery-prizes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.GAME],
    }),
    createGame: builder.mutation<Game, Partial<Game>>({
      query: (data) => ({
        url: `${endpoint}/games`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.GAME],
    }),
    getAllLotteryPrizes: builder.query<ApiResponse<PaginatedResponse<LotteryPrize[]>>, { page?: number,q?:string,limit?:number,active?:string,offset?:number,orderField?:string,orderDirection?:string }>({
      query: ({ page, limit, offset,q,
        orderField,
        orderDirection,
        active}) => ({
        url: `${endpoint}/lottery-prizes`,
        method: "GET",
        params: {
          page,
          limit,
          offset,
          q,
          orderField,
          orderDirection,
          active
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
      url: `${endpoint}/games`,
      method: "GET",
      params: {
        ...(params ?? {}),
      },
    }),
      providesTags: [InvalidatesTagsEnum.GAME],
    }),

    getGameDetail: builder.query<Game, string>({
      query: (gameId) => ({
        url: `${endpoint}/games/${gameId}`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.GAME],
    }),
    updateGame: builder.mutation<Game, { id: string; data: Partial<Game> }>({
      query: ({ id, data }) => ({
        url: `${endpoint}/games/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.GAME],
    }),
    deleteGame: builder.mutation<void, { id: string; removePrizes: boolean }>({
      query: ({ id, removePrizes }) => ({
        url: `${endpoint}/games/${id}?removePrizes=${removePrizes}`,
        method: "DELETE",
      }),
      invalidatesTags: [InvalidatesTagsEnum.GAME],
    }),
  }),
});

export const { useDeleteGameMutation,useGetAllGamesQuery,useGetGameDetailQuery,useLazyGetAllGamesQuery,useLazyGetGameDetailQuery,useUpdateGameMutation,useCreateGameMutation,useCreatePrizeGameMutation,useCreatePrizeLotteryMutation,useGetAllLotteryPrizesQuery } = gameApi;