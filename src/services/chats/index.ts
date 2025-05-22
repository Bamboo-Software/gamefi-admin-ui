/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";

export const createChatApi = (prefix: string) => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createChat: builder.mutation<Chat, Partial<Chat>>({
        query: (data) => ({
          url: `${prefix}/chats`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.CHAT],
      }),
      getAllChats: builder.query<ApiResponse<PaginatedResponse<Chat[]>>, QueryChatRequest & { prefix: string }>({
        query: ({ page, limit, offset, q, type, status, orderField, orderDirection, prefix }) => ({
          url: `${prefix}/chats`,
          method: "GET",
          params: {
            page,
            limit,
            offset,
            q,
            type,
            status,
            orderField,
            orderDirection,
          },
        }),
        providesTags: [InvalidatesTagsEnum.CHAT],
      }),
      getAllParticipantChat: builder.infiniteQuery<
          {
            data: any;
            items: User[];
            total: number;
            limit: number;
          },
          { chatId: string; prefix: string },
          number
        >({
          infiniteQueryOptions: {
            initialPageParam: 1,
          getNextPageParam: (lastPage, _, lastPageParam) => {
          const currentPage = lastPageParam;
          const totalPages = Math.ceil(lastPage.data.total / lastPage.data.limit);
          return currentPage < totalPages ? currentPage + 1 : undefined;
        }
      },
      query: ({ queryArg, pageParam = 1 }) => {
        return {
          url: `${queryArg.prefix}/chats/${queryArg.chatId}/participants`,
          method: "GET",
          params: {
            offset: (pageParam - 1) * 10,
            page: pageParam,
          },
        };
      },
        providesTags: [InvalidatesTagsEnum.CHAT],
        }),
      getAllMessageChat: builder.infiniteQuery<
          {
            data: any;
            items: ChatRoomMessage[];
            total: number;
            limit: number;
          },
          { chatId: string; prefix: string },
          number
        >({
          infiniteQueryOptions: {
            initialPageParam: 1,
          getNextPageParam: (lastPage, _, lastPageParam) => {
          const currentPage = lastPageParam;
          const totalPages = Math.ceil(lastPage.data.total / lastPage.data.limit);
          return currentPage < totalPages ? currentPage + 1 : undefined;
        }
      },
      query: ({ queryArg, pageParam = 1 }) => {
        return {
          url: `${queryArg.prefix}/chats/${queryArg.chatId}/messages`,
          method: "GET",
          params: {
            offset: (pageParam - 1) * 10,
            page: pageParam,
          },
        };
      },
        providesTags: [InvalidatesTagsEnum.CHAT],
      }),
      getChatDetail: builder.query<Chat, { id: string; prefix: string }>({
        query: ({ id, prefix }) => ({
          url: `${prefix}/chats/${id}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.CHAT],
      }),
      updateChat: builder.mutation<Chat, { id: string; data: Partial<Chat>; prefix: string }>({
        query: ({ id, data, prefix }) => ({
          url: `${prefix}/chats/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.CHAT],
      }),
      deleteChat: builder.mutation<void, { id: string; prefix: string }>({
        query: ({ id, prefix }) => ({
          url: `${prefix}/chats/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [InvalidatesTagsEnum.CHAT],
      }),
    }),
  });
};
