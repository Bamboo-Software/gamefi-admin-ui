import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenericSelectContent from "@/components/select-table";
import { TYPE_OPTIONS, FREQUENCY_OPTIONS, SOCIAL_TYPE_OPTIONS } from "@/constants/tasks";
import { STATUS_OPTIONS } from "@/constants/user";
import { TaskTypeEnum } from "@/enums/task.enums";

const DialogEditTask = React.memo(({ isEditTaskOpen, handleEditUser, setIsEditUserOpen, currentTask, setCurrentTask }: {
  isEditTaskOpen: boolean,
  handleEditUser: () => void,
  setIsEditUserOpen: React.Dispatch<React.SetStateAction<boolean>>,
  currentTask: Task | null,
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>
}) => {
  return (
    <Dialog open={isEditTaskOpen} onOpenChange={setIsEditUserOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to the task's information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {currentTask && (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Title</Label>
              <Input
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Description</Label>
              <Input
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Frequency</Label>
              <Select
                value={currentTask.frequency}
                onValueChange={(value) => setCurrentTask({ ...currentTask, frequency: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <GenericSelectContent options={FREQUENCY_OPTIONS} />
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Points</Label>
              <Input
                type="number"
                value={currentTask.pointsReward}
                onChange={(e) => setCurrentTask({ ...currentTask, pointsReward: Number(e.target.value) })}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Reward Details</Label>
              <Input
                value={currentTask.rewardDetails}
                onChange={(e) => setCurrentTask({ ...currentTask, rewardDetails: e.target.value })}
              />
            </div>

            {/* Task Type */}
            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Type</Label>
              <Select
                value={currentTask.type}
                onValueChange={(value) => setCurrentTask({ ...currentTask, type: value as TaskTypeEnum })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <GenericSelectContent options={TYPE_OPTIONS} />
              </Select>
            </div>

            {/* Social Task Type */}
            {currentTask.type === "social" && (
              <div className="flex items-center gap-4">
                <Label className="min-w-[100px]">Social Type</Label>
                <Select
                  value={currentTask.socialTaskType}
                  onValueChange={(value) => setCurrentTask({ ...currentTask, socialTaskType: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select social type" />
                  </SelectTrigger>
                  <GenericSelectContent options={SOCIAL_TYPE_OPTIONS} />
                </Select>
              </div>
            )}

            {/* Active Status */}
            <div className="flex items-center gap-4">
              <Label className="min-w-[100px]">Status</Label>
              <Select
                value={currentTask.active.toString()}
                onValueChange={(value) => setCurrentTask({ ...currentTask, active: value === "true" })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <GenericSelectContent options={STATUS_OPTIONS} />
              </Select>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setCurrentTask(null);
              setIsEditUserOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleEditUser}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default DialogEditTask;
