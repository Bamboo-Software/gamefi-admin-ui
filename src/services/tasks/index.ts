import { InvalidatesTagsEnum } from "@/constants/invalidates-tags";
import { baseApi } from "../baseApi";


export const createTaskApi = (prefix: string) => {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createTask: builder.mutation<Task, Partial<Task>>({
        query: (data) => ({
          url: `${prefix}/tasks`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.TASK],
      }),
      getAllTasks: builder.query<ApiResponse<PaginatedResponse<Task[]>>, QueryTaskRequest>({
        query: ({
          page,
          limit,
          offset,
          q,
          socialTaskType,
          orderField,
          orderDirection,
          type,
          title,
          active,
        }) => ({
          url: `${prefix}/tasks`,
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
            active,
          },
        }),
        providesTags: [InvalidatesTagsEnum.TASK],
      }),
      getTaskDetail: builder.query<Task, string>({
        query: (taskId) => ({
          url: `${prefix}/tasks/${taskId}`,
          method: "GET",
        }),
        providesTags: [InvalidatesTagsEnum.TASK],
      }),
      updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
        query: ({ id, data }) => ({
          url: `${prefix}/tasks/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [InvalidatesTagsEnum.TASK],
      }),
      deleteTask: builder.mutation<void, string>({
        query: (taskId) => ({
          url: `${prefix}/tasks/${taskId}`,
          method: "DELETE",
        }),
        invalidatesTags: [InvalidatesTagsEnum.TASK],
      }),
    }),
  });
};


