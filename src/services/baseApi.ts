import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth-token")?.replace(/^"|"$/g, "");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
    tagTypes: Object.values(InvalidatesTagsEnum),
  endpoints: () => ({}),
});
