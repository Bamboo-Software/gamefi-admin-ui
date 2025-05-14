import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
  import { ChevronDown } from "lucide-react";
  import React from "react";

  const DialogViewUser = React.memo(
    ({
      isViewUserOpen,
      setIsViewUserOpen,
      currentUser,
    }: {
      isViewUserOpen: boolean;
      setIsViewUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
      currentUser: User | null;
    }) => {
      return (
        <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
          <DialogContent className="w-full max-w-5xl max-h-[70vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>View User Details</DialogTitle>
              <DialogDescription>
                View all information about the user in readonly mode.
              </DialogDescription>
            </DialogHeader>
            {currentUser ? (
              <>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <Field label="Full Name">
                    <Input value={currentUser.fullName} disabled />
                  </Field>
                  <Field label="Username">
                    <Input value={currentUser.username} disabled />
                  </Field>
                  <Field label="Role">
                    <Input value={currentUser.role} disabled />
                  </Field>
                  <Field label="Points Balance">
                    <Input value={currentUser.pointsBalance.$numberDecimal} disabled />
                  </Field>
                  <Field label="Timezone">
                    <Input value={currentUser.timezone} disabled />
                  </Field>
                  <Field label="Referral Code">
                    <Input value={currentUser.referralCode} disabled />
                  </Field>
                  <Field label="Email Verified">
  anor
                    <Input value={currentUser.emailVerified ? "Yes" : "No"} disabled />
                  </Field>
                  <Field label="Phone Verified">
                    <Input value={currentUser.phoneVerified ? "Yes" : "No"} disabled />
                  </Field>
                  <Field label="Active">
                    <Input value={currentUser.active ? "Yes" : "No"} disabled />
                  </Field>
                  <Field label="Last Login">
                    <Input value={new Date(currentUser.lastLoginAt).toLocaleString()} disabled />
                  </Field>
                  <Field label="Created At">
                    <Input value={new Date(currentUser.createdAt).toLocaleString()} disabled />
                  </Field>
                  <Field label="Updated At">
                    <Input value={new Date(currentUser.updatedAt).toLocaleString()} disabled />
                  </Field>
                  <Field label="Telegram Language">
                    <Input value={currentUser.telegramLanguageCode} disabled />
                  </Field>
                  <Field label="Estimated Telegram Account Age">
                    <Input value={currentUser.estimatedTelegramAccountAge} disabled />
                  </Field>
                  <Field label="Avatar URL">
                    <Input value={currentUser.avatar} disabled />
                  </Field>
                </div>
                <div className="mt-4">
                  <Label className="text-md font-semibold">Social Connections</Label>
                  {currentUser.socials.length > 0 ? (
                    currentUser.socials.map((social) => (
                      <Collapsible key={social._id}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                          <span>{social.socialType} (ID: {social.socialId})</span>
                          <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <span className="font-medium">Social Type:</span>
                            <span>{social.socialType}</span>
                            <span className="font-medium">Social ID:</span>
                            <span>{social.socialId}</span>
                            <span className="font-medium">Created At:</span>
                            <span>{new Date(social.createdAt).toLocaleString()}</span>
                            <span className="font-medium">Updated At:</span>
                            <span>{new Date(social.updatedAt).toLocaleString()}</span>
                            <span className="font-medium">Access Token Expires:</span>
                            <span>{new Date(social.accessTokenExpiredAt).toLocaleString()}</span>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm mt-2">
                      No social connections found.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <Label className="text-md font-semibold">Transactions</Label>
                  {currentUser?.transactions?.length > 0 ? (
                    currentUser?.transactions?.map((transaction) => (
                      <Collapsible key={transaction._id}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                          <span>{transaction.metadata.description}</span>
                          <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <span className="font-medium">Type:</span>
                            <span>{transaction.type}</span>
                            <span className="font-medium">Status:</span>
                            <span>{transaction.status}</span>
                            <span className="font-medium">Earn Points:</span>
                            <span>{transaction.earnPoints}</span>
                            <span className="font-medium">Spend Points:</span>
                            <span>{transaction.spendPoints}</span>
                            <span className="font-medium">Multiplier:</span>
                            <span>{transaction.multiplier}</span>
                            <span className="font-medium">Created At:</span>
                            <span>{new Date(transaction.createdAt).toLocaleString()}</span>
                            <span className="font-medium">Updated At:</span>
                            <span>{new Date(transaction.updatedAt).toLocaleString()}</span>
                            {transaction.gameId && (
                              <>
                                <span className="font-medium">Game ID:</span>
                                <span>{transaction.gameId}</span>
                              </>
                            )}
                            {transaction.referralId && (
                              <>
                                <span className="font-medium">Referral ID:</span>
                                <span>{transaction.referralId}</span>
                              </>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm mt-2">
                      No transactions found.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                No user data available.
              </p>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
  );
  
  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
    </div>
  );
  
  export default DialogViewUser;