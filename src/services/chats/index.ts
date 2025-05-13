import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
const reducerPath = "chatApi";
const endpoint = "admin/lottery";

export const chatApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.CHAT],
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
    createChat: builder.mutation<Chat, Partial<Chat>>({
      query: (data) => ({
        url: `${endpoint}/chats`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.CHAT],
    }),
    getAllChats: builder.query<ApiResponse<PaginatedResponse<Chat[]>>, { page?: number,status?:string,q?:string,type?:string,limit?:number,offset?:number,orderField?:string,orderDirection?:string,username?:string }>({
      query: ({ page, limit, offset,q,type,status,
        orderField,
        orderDirection
        }) => ({
        url: `${endpoint}/chats`,
        method: "GET",
        params: {
          page,status,
          limit,
          offset,
         
          type,
          q,
          orderField,
          orderDirection,
        },
      }),
      providesTags: [InvalidatesTagsEnum.CHAT],
    }),
    getChatDetail: builder.query<Chat, string>({
      query: (chatId) => ({
        url: `${endpoint}/chats/${chatId}`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.CHAT],
    }),
    updateChat: builder.mutation<Chat, { id: string; data: Partial<Chat> }>({
      query: ({ id, data }) => ({
        url: `${endpoint}/chats/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.CHAT],
    }),
    deleteChat: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `${endpoint}/chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: [InvalidatesTagsEnum.CHAT],
    }),
  }),
});

export const { useDeleteChatMutation,useGetAllChatsQuery,useGetChatDetailQuery,useLazyGetAllChatsQuery,useLazyGetChatDetailQuery,useUpdateChatMutation,useCreateChatMutation } = chatApi;