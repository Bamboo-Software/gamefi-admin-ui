import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
const reducerPath = "dashboardApi";
const endpoint = "admin/lottery/dashboard";

export const dashboardApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.DASHBOARD],
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
    summaryUser: builder.query({
      query: () => ({
        url: `${endpoint}/summary-user`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.DASHBOARD],
    }),
    revenueUser: builder.query({
      query: () => ({
        url: `${endpoint}/revenue-user`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.DASHBOARD],
    }),
    roleUser: builder.query({
      query: () => ({
        url: `${endpoint}/role-user`,
        method: "GET"
      }),
      providesTags: [InvalidatesTagsEnum.DASHBOARD],
    }),
    weeklyActive: builder.query({
      query: () => ({
        url: `${endpoint}/weekly-active`,
        method: "GET"
      }),
      providesTags: [InvalidatesTagsEnum.DASHBOARD],
    }),
    recentLogin: builder.query({
      query: () => ({
        url: `${endpoint}/recent-logins`,
        method: "GET"
      }),
      providesTags: [InvalidatesTagsEnum.DASHBOARD],
    }),
  }),
});

export const { useRecentLoginQuery,useWeeklyActiveQuery,useSummaryUserQuery,useRevenueUserQuery,useRoleUserQuery } = dashboardApi;