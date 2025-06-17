import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";
import { CreateSeasonRequest, Season } from '@/interfaces/seasons';
import { CreateNFTRequest, NFT } from '@/interfaces/nfts';
const endpoint = "nfts"

export const createNFTApi = () => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createNFT: builder.mutation<NFT,CreateNFTRequest>({
        query: (data) => ({
          url: endpoint,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.NFT],
      }),
      getAllNFT: builder.query<
        ApiResponse<PaginatedResponse<NFT[]>>,
        {
          page?: number;
          q?: string;
          limit?: number;
          active?: string;
          offset?: number;
          orderField?: string;
          orderDirection?: string;
          seasonId?:string
        }
      >({
        query: ({ page, limit, offset, q, orderField, orderDirection, active, seasonId}) => ({
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
            seasonId
          },
        }),
        providesTags: [InvalidatesTagsEnum.NFT],
      }),
      getNFTDetail: builder.query<NFT, string>({
        query: (id) => ({
          url: `${endpoint}/${id}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.NFT],
      }),
      updateNFT: builder.mutation<Season, { id: string; data: Partial<CreateSeasonRequest> }>({
        query: ({ id, data }) => ({
          url: `${endpoint}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.NFT],
      }),
      deleteNFT: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `${endpoint}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [InvalidatesTagsEnum.NFT],
      }),
    }),
  });
};

