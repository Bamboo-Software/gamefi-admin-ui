import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { LoginRequest, RegisterRequest, RegisterResponse, UserResponse } from "@/interfaces/auth";

const reducerPath = "authApi";
const endpoint = 'auth';


export const authApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.AUTH],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "getMe") {
        const storedToken = localStorage.getItem('auth-token');
        if (storedToken) {
          const cleanToken = storedToken.replace(/^"|"$/g, '');
          headers.set("Authorization", `Bearer ${cleanToken}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: `${endpoint}/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("auth-token", JSON.stringify(data.token));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${endpoint}/register`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      queryFn: () => {
        localStorage.removeItem("auth-token");
        return { data: undefined };
      },
      invalidatesTags: [InvalidatesTagsEnum.AUTH],
    }),
    getMe: builder.query({
      query: () => ({
        url: `${endpoint}/me`,
      }),
      providesTags: [InvalidatesTagsEnum.AUTH],
    }),
    
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;