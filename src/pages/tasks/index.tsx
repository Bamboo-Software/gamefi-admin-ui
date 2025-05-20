
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ListPlus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetAllTasksQuery, useUpdateTaskMutation } from "@/services/tasks";
import { AdminTable } from "@/components/table-admin";
import { debounce } from "lodash";
import { getStatusColor } from "@/utils";
import { LoadingSpinner } from "@/components/spinner";
import { getTaskCellConfigs, SOCIAL_TYPE_OPTIONS, TABLE_HEADERS_TASK, TYPE_OPTIONS } from "@/constants/tasks";
import GenericSelectContent from "@/components/select-table";
import { ROW_OPTIONS } from "@/constants";
import { STATUS_OPTIONS } from "@/constants/user";
import SearchInput from "@/components/input-search";
import TableTaskGenericCell from "@/components/pages/tasks/task-cell";
import { SocialTaskTypeEnum, TaskFrequencyEnum, TaskTypeEnum } from "@/enums/task.enums";
import { toast } from "sonner";
import DialogEditTask from "@/components/pages/tasks/dialog-edit";
import DialogCreateTask from "@/components/pages/tasks/dialog-create";
import DialogViewTask from "@/components/pages/tasks/dialog-view";
import { ConfirmDeleteDialog } from "@/components/pages/user/dialog-delete";
const PaginationTable = React.lazy(() => import("@/components/pagination-table"));
const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ASC" | "DESC" } | null>(null);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [type, setType] = useState<TaskTypeEnum |string>("");
    const [socialType, setSocialType] = useState<SocialTaskTypeEnum | string>("");
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
    const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      frequency: TaskFrequencyEnum.PERMANENT,
      pointsReward: 0,
      rewardDetails: "",
      type: TaskTypeEnum.OTHER,
      active: true,
      socialTaskType: SocialTaskTypeEnum.INSTAGRAM_COMMENT,
    });

  const [createTask] = useCreateTaskMutation();
    const [active, setActive] = useState("");
    const debouncedSetSearchTerm = useMemo(
        () => debounce((value: string) => setDebouncedSearchTerm(value), 150),
        []
    );
    const queryParams = useMemo(() => {
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      title: debouncedSearchTerm,
      q: debouncedSearchTerm,
      type: type,
      socialTaskType: socialType,
      active: active,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "DESC",
    };
    const filteredParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) => value !== ""
      )
    );
    return filteredParams;
  }, [currentPage, type,active,socialType, itemsPerPage, debouncedSearchTerm, sortConfig]);
  const { data:taskData, isLoading } = useGetAllTasksQuery(queryParams);
  console.log("🚀 ~ Tasks ~ taskData:", taskData)
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const handleOpenDeleteDialog = (task: Task) => {
    setCurrentTask(task);
    setDialogDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!currentTask) return;
    try {
      await deleteTaskMutation(currentTask._id).unwrap();
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
    } finally {
      setDialogDeleteOpen(false);
      setCurrentTask(null);
    }
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);
  const handleSelectTask = useCallback((userId: string) => {
      setSelectedTasks((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    }, []);
  const handleSort = useCallback((key: string) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return prev.direction === "ASC" ? { key, direction: "DESC" } : null;
        }
        return { key, direction: "ASC" };
      });
    }, []);
  const handleEditTask = useCallback(async () => {
    if (!currentTask) return;
    try {
      await updateTask({
        id: currentTask._id,
        data: { type: currentTask.type, active: currentTask.active },
      }).unwrap();
      setCurrentTask(null);
      setIsEditTaskOpen(false);
    } catch (err) {
      console.error("Update user failed:", err);
    }
  }, [currentTask, updateTask])


  const handleDeleteSelected = () => {
    setTasks(tasks.filter(task => !selectedTasks.includes(task._id)));
    setSelectedTasks([]);
  };
  const handleCreateTask = async () => {
    try {
      await createTask(newTask).unwrap();
      toast.success("Task created successfully!");
      setIsCreateTaskOpen(false);
      setNewTask({
        title: "",
        description: "",
        frequency: TaskFrequencyEnum.PERMANENT,
        pointsReward: 0,
        rewardDetails: "",
        type: TaskTypeEnum.OTHER,
        active: true,
        socialTaskType: SocialTaskTypeEnum.INSTAGRAM_COMMENT,
      });
    } catch {
      toast.error("Failed to create task!");
    }
  };
  const handleOpenCreateDialog = () => {
    setIsCreateTaskOpen(true);
  };
useEffect(() => {
    if (taskData?.data && taskData?.data.items) {
      setTasks(taskData?.data.items);
      setTotal(taskData?.data.total);
    } else {
      setTasks([]);
      setTotal(0);
    }
}, [taskData]);
  useEffect(() => {
      const maxPage = Math.ceil(total / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
    }, [total, itemsPerPage, currentPage]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks Management</h1>
          <p className="text-muted-foreground">Manage your tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button  onClick={handleOpenCreateDialog}>
            <ListPlus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            Manage your organization's tasks, task title, and task description.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
              <div className="flex gap-4">
                <SearchInput placeholder={"Search task..."} searchTerm={searchTerm} onChange={handleChange} />
                <Select
                  value={type}
                  onValueChange={(value) => setType(value)}
                >
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <GenericSelectContent options={TYPE_OPTIONS} />
                </Select>
                <Select
                  value={socialType}
                  onValueChange={(value) => setSocialType(value)}
                >
                  <SelectTrigger className="w-[150px] font-medium cursor-pointer">
                    <SelectValue placeholder="Social Type" />
                  </SelectTrigger>
                  <GenericSelectContent options={SOCIAL_TYPE_OPTIONS} />
                </Select>
                <Select
                  value={active}
                  onValueChange={(value) => setActive(value)}
                >
                  <SelectTrigger className="w-[120px] font-medium cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <GenericSelectContent options={STATUS_OPTIONS} />
                </Select>
              </div>
              <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setDebouncedSearchTerm("");
                  setSortConfig(null);
                  setActive("");
                  setType("");
                  setSocialType("");
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] font-medium cursor-pointer">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <GenericSelectContent options={ROW_OPTIONS} />
              </Select>
              </div>
            </div>
        </CardHeader>
        <CardContent>
          {selectedTasks.length > 0 && (
            <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
              <p className="text-sm">{selectedTasks.length} users selected</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}
          <AdminTable<Task>
            data={tasks}
            selectedUsers={selectedTasks}
            sortConfig={sortConfig}
            isLoading={isLoading}
            handleSelect={handleSelectTask}
            handleDelete={handleOpenDeleteDialog}
            setCurrent={setCurrentTask}
            setIsEditOpen={setIsEditTaskOpen}
            setIsViewOpen={setIsViewTaskOpen}
            getStatusColor={getStatusColor}
            handleSort={handleSort}
            getCellConfigs={(task, utils) => getTaskCellConfigs(task, utils)}
            renderCell={(config, idx) => <TableTaskGenericCell key={idx} {...config} />}
            columns={TABLE_HEADERS_TASK}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground min-w-[200px]">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  Showing {tasks.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                  {Math.min((currentPage - 1) * itemsPerPage + tasks.length, total)} of {total}
                </>
              )}
            </div>
            <PaginationTable
              currentPage={currentPage}
              totalPages={Math.floor(total / itemsPerPage)}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
      <DialogEditTask isEditTaskOpen={isEditTaskOpen} handleEditUser={handleEditTask} setIsEditUserOpen={setIsEditTaskOpen} currentTask={currentTask} setCurrentTask={setCurrentTask} />
        <ConfirmDeleteDialog
          open={dialogDeleteOpen}
          username={currentTask?.title}
          onClose={() => setDialogDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
      />
      <DialogCreateTask
        isCreateTaskOpen={isCreateTaskOpen}
        setIsCreateTaskOpen={setIsCreateTaskOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        handleCreateTask={handleCreateTask}
      />
     <DialogViewTask
        isViewTaskOpen={isViewTaskOpen}
        setIsViewTaskOpen={setIsViewTaskOpen}
        currentTask={currentTask}
      />
    </div>
  );
};

export default Tasks;