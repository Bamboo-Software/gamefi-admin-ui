import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GenericSelectContent from "@/components/select-table";
import { SOCIAL_TYPE_OPTIONS, TYPE_OPTIONS } from "@/constants/tasks";
import { FREQUENCY_OPTIONS, STATUS_OPTIONS } from "@/constants/user";
import React from "react";

const DialogViewTask = React.memo(({ isViewTaskOpen, setIsViewTaskOpen, currentTask }: { isViewTaskOpen: boolean, setIsViewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>, currentTask: Task | null }) => {
  return (
    <Dialog open={isViewTaskOpen} onOpenChange={setIsViewTaskOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Task Details</DialogTitle>
          <DialogDescription>View all information about the task in readonly mode.</DialogDescription>
        </DialogHeader>
        {currentTask && (
          <div className="flex flex-col gap-4 py-4">
            <Field label="Title">
              <Input value={currentTask.title} disabled />
            </Field>
            <Field label="Description">
              <Textarea value={currentTask.description} disabled />
            </Field>
            <Field label="Frequency">
              <Select value={currentTask.frequency} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <GenericSelectContent options={FREQUENCY_OPTIONS} />
              </Select>
            </Field>
            <Field label="Points Reward">
              <Input type="number" value={currentTask.pointsReward ?? 0} disabled />
            </Field>
            <Field label="Reward Details">
              <Input value={currentTask.rewardDetails} disabled />
            </Field>
            <Field label="Type">
              <Select value={currentTask.type} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <GenericSelectContent options={TYPE_OPTIONS} />
              </Select>
            </Field>
            <Field label="Action URL">
              <Input value={currentTask.actionUrl} disabled />
            </Field>
            <Field label="Required Count">
              <Input type="number" value={currentTask.requiredCount} disabled />
            </Field>
            <Field label="Active">
              <Select value={currentTask.active.toString()} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <GenericSelectContent options={STATUS_OPTIONS} />
              </Select>
            </Field>
            <Field label="Social Task Type">
              <Select value={currentTask.socialTaskType} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select social task type" />
                </SelectTrigger>
                <GenericSelectContent options={SOCIAL_TYPE_OPTIONS} />
              </Select>
            </Field>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsViewTaskOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <Label className="text-sm font-semibold">{label}</Label>
    {children}
  </div>
);

export default DialogViewTask;