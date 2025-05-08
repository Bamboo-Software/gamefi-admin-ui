import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void
  onConfirm: () => void;
  username?: string;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  username,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm game deletion</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
        Are you sure you want to delete {username ? `"${username}"` : "this user"}? This action cannot be undone.
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
          Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
