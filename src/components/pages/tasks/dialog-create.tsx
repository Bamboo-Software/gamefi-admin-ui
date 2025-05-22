import GenericSelectContent from "@/components/select-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TYPE_OPTIONS, SOCIAL_TYPE_OPTIONS } from "@/constants/tasks";
import { FREQUENCY_OPTIONS, STATUS_OPTIONS } from "@/constants/user";
import { TaskFrequencyEnum, TaskTypeEnum, SocialTaskTypeEnum } from "@/enums/task.enums";
import React, { useEffect } from "react";

const DialogCreateTask = React.memo(({
  isCreateTaskOpen,
  handleCreateTask,
  setIsCreateTaskOpen,
  newTask,
  setNewTask
}: {
  isCreateTaskOpen: boolean,
  handleCreateTask: () => void,
  setIsCreateTaskOpen: React.Dispatch<React.SetStateAction<boolean>>,
  newTask: {
    title: string;
    description: string;
    frequency: TaskFrequencyEnum;
    pointsReward: number;
    rewardDetails: string;
    type: TaskTypeEnum;
    active: boolean;
    socialTaskType: SocialTaskTypeEnum;
},
  setNewTask: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    frequency: TaskFrequencyEnum;
    pointsReward: number;
    rewardDetails: string;
    type: TaskTypeEnum;
    active: boolean;
    socialTaskType: SocialTaskTypeEnum;
}>>
  }) => {
   useEffect(() => {
     if (!isCreateTaskOpen) {
             setNewTask({title: "",
    description: "",
    frequency: TaskFrequencyEnum.DAILY,
    pointsReward: 0,
    rewardDetails: "",
    type: TaskTypeEnum.GAME,
    active: true,
    socialTaskType: SocialTaskTypeEnum.FACEBOOK_LIKE,})
           }
         }, [isCreateTaskOpen,setNewTask]);
  return (
    <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill in the information to create a new task.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {/* Title */}
          <div className="flex items-center gap-4">
            <Label htmlFor="title" className="text-right min-w-[120px]">Title</Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right min-w-[120px]">Description</Label>
            <Input
              id="description"
              value={newTask.description || ""}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter task description"
            />
          </div>

          {/* Frequency */}
          <div className="flex items-center gap-4">
            <Label htmlFor="frequency" className="text-right min-w-[120px]">Frequency</Label>
            <Select
              value={newTask.frequency}
              onValueChange={(value) => setNewTask({ ...newTask, frequency: value as TaskFrequencyEnum })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <GenericSelectContent options={FREQUENCY_OPTIONS} />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="pointsReward" className="text-right min-w-[120px]">Points Reward</Label>
            <Input
              id="pointsReward"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={newTask.pointsReward ?? ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 || e.target.value === "") {
                  setNewTask({ ...newTask, pointsReward: value });
                }
              }}
              placeholder="Enter points reward"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            />
          </div>


          {/* Reward Details */}
          <div className="flex items-center gap-4">
            <Label htmlFor="rewardDetails" className="text-right min-w-[120px]">Reward Details</Label>
            <Input
              id="rewardDetails"
              value={newTask.rewardDetails || ""}
              onChange={(e) => setNewTask({ ...newTask, rewardDetails: e.target.value })}
              placeholder="Enter reward details"
            />
          </div>

          {/* Type */}
          <div className="flex items-center gap-4">
            <Label htmlFor="type" className="text-right min-w-[120px]">Type</Label>
            <Select
              value={newTask.type}
              onValueChange={(value) => setNewTask({ ...newTask, type: value as TaskTypeEnum })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <GenericSelectContent options={TYPE_OPTIONS} />
            </Select>
          </div>

          {/* Social Task Type (Optional) */}
          <div className="flex items-center gap-4">
            <Label htmlFor="socialTaskType" className="text-right min-w-[120px]">Social Task Type</Label>
            <Select
              value={newTask.socialTaskType || ""}
              onValueChange={(value) => setNewTask({ ...newTask, socialTaskType: value as SocialTaskTypeEnum })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select social task type (optional)" />
              </SelectTrigger>
              <GenericSelectContent options={SOCIAL_TYPE_OPTIONS} />
            </Select>
          </div>

          {/* Active */}
          <div className="flex items-center gap-4">
            <Label htmlFor="active" className="text-right min-w-[120px]">Active</Label>
            <Select
              value={newTask.active.toString()}
              onValueChange={(value) => setNewTask({ ...newTask, active: value === "true" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <GenericSelectContent options={STATUS_OPTIONS} />
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsCreateTaskOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
});

export default DialogCreateTask;
