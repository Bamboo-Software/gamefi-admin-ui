/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";


export const createUserApi = (prefix: string) => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllUsers: builder.query<ApiResponse<PaginatedResponse<User[]>>, CreateUserRequest>({
        query: ({ page, limit, offset, q, orderField, orderDirection, username, role, active, isBot,prefix }) => ({
          url: `${prefix}/users`,
          method: "GET",
          params: {
            page,
            limit,
            offset,
            username,
            isBot,
            q,
            orderField,
            orderDirection,
            role,
            active,
          },
        }),
        providesTags: [InvalidatesTagsEnum.USER],
      }),
      getAllTransactionUser: builder.infiniteQuery<
          {
            data: any;
            items: Transaction[];
            total: number;
            limit: number;
          },
          { userId: string; prefix: string },
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
          url: `${queryArg.prefix}/users/transaction/${queryArg.userId}`,
          method: "GET",
          params: {
            offset: (pageParam - 1) * 10,
            page: pageParam,
          },
        };
      },
        providesTags: [InvalidatesTagsEnum.USER],
      }),
      getUserDetail: builder.query<ApiResponse<User>, string>({
        query: (userId) => ({
          url: `${prefix}/users/${userId}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.USER],
      }),
      updateUser: builder.mutation<ApiResponse<User>, { id: string; data: Partial<User> }>({
        query: ({ id, data }) => ({
          url: `${prefix}/users/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.USER],
      }),
      deleteUser: builder.mutation<void, string>({
        query: (userId) => ({
          url: `${prefix}/users/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: [InvalidatesTagsEnum.USER],
      }),
    }),
  });
};
