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
