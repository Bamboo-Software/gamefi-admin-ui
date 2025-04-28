import GenericSelectContent from "@/components/select-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLE_OPTIONS, STATUS_OPTIONS } from "@/constants/user";
import { RoleTypeEnum } from "@/enums/user.enums";
import React from "react";

const DialogEditUser = React.memo(({ isEditUserOpen, handleEditUser, setIsEditUserOpen, currentUser,setCurrentUser }: { isEditUserOpen: boolean, handleEditUser: () => void, setIsEditUserOpen: React.Dispatch<React.SetStateAction<boolean>>, currentUser: User | null ,setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>}) => {
  return (
    <div> <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Make changes to the user's information. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                {currentUser && (
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center justify-center mb-2">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={`${currentUser.avatar}?w=32`}
                          srcSet={`${currentUser.avatar}?w=32 1x, ${currentUser.avatar}?w=64 2x`}
                          sizes="32px"
                          alt={currentUser.name}
                          loading="lazy"
                        />
                        <AvatarFallback>
                          {currentUser.name?.split(" ")?.map((n: string) => n[0])?.join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right min-w-[40px]">
                        Name
                      </Label>
                      <Input
                        disabled
                        id="edit-name"
                        value={currentUser.name ?? `${currentUser.firstName} ${currentUser.lastName}`}
                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-email" className="text-right min-w-[40px]">
                        Email
                      </Label>
                      <Input
                        disabled
                        id="edit-email"
                        type="email"
                        value={currentUser.email ?? "exemple@gmail.com"}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-role" className="text-right min-w-[40px]">
                        Role
                      </Label>
                      <Select
                        value={currentUser.role}
                        onValueChange={(value) => setCurrentUser({ ...currentUser, role: value as RoleTypeEnum })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <GenericSelectContent options={ROLE_OPTIONS} />
                      </Select>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="edit-active" className="text-right min-w-[40px]">
                        Status
                      </Label>
                      <Select
                        value={currentUser.active.toString()}
                        onValueChange={(value) =>
                          setCurrentUser({ ...currentUser, active: value === "true" })
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
                      setCurrentUser(null);
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

export default DialogEditUser