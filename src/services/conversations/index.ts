import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseQueryWithReauth } from "@/utils/baseQuery";

const reducerPath = "conversationsApi";
const endpoint = "conversations";

export const conversationsApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.CONVERSATIONS],
  baseQuery: baseQueryWithReauth(baseUrl),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `${endpoint}`,
      }),
    }),
    createConversations: builder.mutation({
      query: (body) => ({
        url: `${endpoint}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateConversationsMutation, 
} = conversationsApi;
