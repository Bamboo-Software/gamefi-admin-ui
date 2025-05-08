import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { SocialTaskTypeEnum, TaskTypeEnum } from "@/enums/task.enums";
const reducerPath = "taskApi";
const endpoint = "admin/lottery";

export const taskApi = createApi({
  reducerPath,
  tagTypes: [InvalidatesTagsEnum.TASK],
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
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => ({
        url: `${endpoint}/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.TASK],
    }),
    getAllTasks: builder.query<ApiResponse<PaginatedResponse<Task[]>>, { page?: number,q?:string,title ?:string,email?:string,limit?:number,type?:TaskTypeEnum,active?:string,socialTaskType?:SocialTaskTypeEnum,offset?:number,orderField?:string,orderDirection?:string,username?:string }>({
      query: ({ page, limit, offset,q,socialTaskType,
        orderField,
        orderDirection,
        type,
        title,
        active}) => ({
        url: `${endpoint}/tasks`,
        method: "GET",
        params: {
          page,
          limit,
          offset,
          socialTaskType,
          title,
          q,
          orderField,
          orderDirection,
          type,
          active
        },
      }),
      providesTags: [InvalidatesTagsEnum.TASK],
    }),
    getTaskDetail: builder.query<Task, string>({
      query: (taskId) => ({
        url: `${endpoint}/tasks/${taskId}`,
        method: "GET",
      }),
      providesTags: [InvalidatesTagsEnum.TASK],
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `${endpoint}/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [InvalidatesTagsEnum.TASK],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `${endpoint}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [InvalidatesTagsEnum.TASK],
    }),
  }),
});

export const { useDeleteTaskMutation,useGetAllTasksQuery,useGetTaskDetailQuery,useLazyGetAllTasksQuery,useLazyGetTaskDetailQuery,useUpdateTaskMutation,useCreateTaskMutation } = taskApi;