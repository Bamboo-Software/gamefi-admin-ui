import GenericSelectContent from "@/components/select-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TYPE_OPTIONS } from "@/constants/tasks";
import { STATUS_OPTIONS } from "@/constants/user";
import { TaskTypeEnum } from "@/enums/task.enums";
import React from "react";

const DialogEditTask = React.memo(({ isEditTaskOpen, handleEditUser, setIsEditUserOpen, currentTask,setCurrentTask }: { isEditTaskOpen: boolean, handleEditUser: () => void, setIsEditUserOpen: React.Dispatch<React.SetStateAction<boolean>>, currentTask: Task | null ,setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>}) => {
  return (
    <div> <Dialog open={isEditTaskOpen} onOpenChange={setIsEditUserOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>
                    Make changes to the task's information. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                {currentTask && (
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-type" className="text-right min-w-[40px]">
                        Type
                      </Label>
                      <Select
                        value={currentTask.type}
                        onValueChange={(value) => setCurrentTask({ ...currentTask, type: value as TaskTypeEnum})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <GenericSelectContent options={TYPE_OPTIONS} />
                      </Select>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-active" className="text-right min-w-[40px]">
                        Status
                      </Label>
                      <Select
                        value={currentTask.active.toString()}
                        onValueChange={(value) =>
                          setCurrentTask({ ...currentTask, active: value === "true" })
                        }
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
            </Dialog></div>
  )
})

export default DialogEditTask