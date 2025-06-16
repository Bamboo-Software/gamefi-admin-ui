import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";
import { CreateSeasonRequest, Season } from '@/interfaces/seasons';
const endpoint = "seasons"

export const createSeasonApi = () => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createSeason: builder.mutation<Season,CreateSeasonRequest>({
        query: (data) => ({
          url: endpoint,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.SEASON],
      }),
      getAllSeason: builder.query<
        ApiResponse<PaginatedResponse<Season[]>>,
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
          url: endpoint,
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
        providesTags: [InvalidatesTagsEnum.SEASON],
      }),
      getSeasonDetail: builder.query<Season, string>({
        query: (id) => ({
          url: `${endpoint}/${id}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.SEASON],
      }),
      updateSeason: builder.mutation<Season, { id: string; data: Partial<CreateSeasonRequest> }>({
        query: ({ id, data }) => ({
          url: `${endpoint}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.SEASON],
      }),
      deleteSeason: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `${endpoint}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [InvalidatesTagsEnum.SEASON],
      }),
    }),
  });
};

