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
    getAllUsers: builder.query<ApiResponse<PaginatedResponse<User[]>>, { page: number,q:string,email:string,limit:number,offset:number,orderField:string,orderDirection:string,active?:boolean }>({
          query: ({ page, limit, offset,email,q}) => ({
        url: `${endpoint}/users`,
        method: "GET",
        params: {
          page,
          limit,
          offset,
          email,
          q,
          // active
        },
      }),
      }),
  }),
});

export const { useGetAllUsersQuery } = userApi;