import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
const reducerPath = "userApi";
const endpoint = "admin/lottery";

export const userApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.USER],
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
    getAllUsers: builder.query<ApiResponse<PaginatedResponse<User[]>>, { page?: number,q?:string,email?:string,limit?:number,role?:string,active?:string,offset?:number,orderField?:string,orderDirection?:string,username?:string }>({
      query: ({ page, limit, offset,q,orderField,orderDirection,username,role,active}) => ({
        url: `${endpoint}/users`,
        method: "GET",
        params: {
          page,
          limit,
          offset,
          username,
          q,
          orderField,
          orderDirection,
          role,
          active
        },
      }),
      providesTags: [InvalidatesTagsEnum.USER],
    }),
    getUserDetail: builder.query<User, string>({
      query: (userId) => ({
        url: `${endpoint}/users/${userId}`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.USER],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `${endpoint}/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.USER],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${endpoint}/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [InvalidatesTagsEnum.USER],
    }),
  }),
});

export const { useGetAllUsersQuery,useDeleteUserMutation,useLazyGetAllUsersQuery,useUpdateUserMutation } = userApi;