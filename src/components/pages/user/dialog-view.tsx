/* eslint-disable @typescript-eslint/no-explicit-any */
import { skipToken } from '@reduxjs/toolkit/query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { createUserApi } from "@/services/users";
import { useModulePrefix } from "@/hooks/useModulePrefix";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Field = ({ label, children }:any) => (
  <div>
    <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

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
    const prefix = useModulePrefix();
    const userApi = useMemo(() => createUserApi(prefix), [prefix]);
    const { useGetAllTransactionUserInfiniteQuery } = userApi;
    const queryArg = currentUser ? { userId: currentUser._id, prefix } : skipToken;

    const {
      data,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isError,
    } = useGetAllTransactionUserInfiniteQuery(queryArg, {
    refetchOnMountOrArgChange:true
  });

    const transactions = data?.pages.flatMap(page => page.data.items) || [];

    const scrollContainerRef = useRef<HTMLDivElement>(null);

   const handleScroll = useCallback(() => {
  const container = scrollContainerRef.current;
  if (!container) return;

  const { scrollTop, clientHeight, scrollHeight } = container;

  if (isFetching || !hasNextPage) return;


  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchNextPage();
  }
}, [hasNextPage, isFetching, fetchNextPage]);


   useEffect(() => {
    const container = scrollContainerRef.current;
    const timer = setTimeout(() => {
      if (container) {
        container.addEventListener("scroll", handleScroll);
      }
    }, 50);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(timer);
    };
  }, [handleScroll]);

  console.log("🚀 ~ currentUser:", currentUser)
    return (
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[700px] overflow-y-auto">
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
                  <Input value={currentUser.fullName || currentUser.name || `${currentUser.firstName} ${currentUser.lastName}`} disabled />
                </Field>
                <Field label="Username">
                  <Input value={currentUser.username || ""} disabled />
                </Field>
                <Field label="Role">
                  <Input value={currentUser.role || ""} disabled />
                </Field>
                <Field label="Points Balance">
                  <Input value={currentUser.pointsBalance?.$numberDecimal || "0"} disabled />
                </Field>
                <Field label="Timezone">
                  <Input value={currentUser.timezone || ""} disabled />
                </Field>
                <Field label="Referral Code">
                  <Input value={currentUser.referralCode || ""} disabled />
                </Field>
                <Field label="Email Verified">
                  <Input value={currentUser.emailVerified ? "Yes" : "No"} disabled />
                </Field>
                <Field label="Phone Verified">
                  <Input value={currentUser.phoneVerified ? "Yes" : "No"} disabled />
                </Field>
                <Field label="Active">
                  <Input value={currentUser.active ? "Yes" : "No"} disabled />
                </Field>
                <Field label="Last Login">
                  <Input value={currentUser.lastLoginAt ? new Date(currentUser.lastLoginAt).toLocaleString() : ""} disabled />
                </Field>
                <Field label="Created At">
                  <Input value={currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleString() : ""} disabled />
                </Field>
                <Field label="Updated At">
                  <Input value={currentUser.updatedAt ? new Date(currentUser.updatedAt).toLocaleString() : ""} disabled />
                </Field>
                <Field label="Telegram Language">
                  <Input value={currentUser.telegramLanguageCode || ""} disabled />
                </Field>
                <Field label="Estimated Telegram Account Age">
                  <Input value={currentUser.estimatedTelegramAccountAge || ""} disabled />
                </Field>
               <Field label="Avatar">
                <Avatar>
                  <AvatarImage src={currentUser.avatar} alt="User avatar" />
                  <AvatarFallback>
                    {currentUser.name?.charAt(0).toUpperCase() ?? "U"}
                  
                  </AvatarFallback>
                </Avatar>
              </Field>
              </div>

              <div className="mt-4">
                <Label className="text-md font-semibold">Social Connections</Label>
                {currentUser.socials?.length > 0 ? (
                  currentUser.socials.map((social) => (
                    <Collapsible key={social._id}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                        <span>
                          {social.socialType} (ID: {social.socialId})
                        </span>
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
                <div
                  ref={scrollContainerRef}
                  className="max-h-96 overflow-auto border rounded p-2"
                >
                  {isError ? (
                    <p className="text-red-500 text-sm mt-2">
                      Error loading transactions. Please try again.
                    </p>
                  ) : transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <Collapsible key={transaction._id}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 border rounded-md hover:bg-muted mt-2">
                          <span>{transaction.metadata?.description || "N/A"}</span>
                          <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4 pb-2 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries({
                              Type: transaction.type,
                              Status: transaction.status,
                              "Earn Points": transaction.earnPoints,
                              "Spend Points": transaction.spendPoints,
                              Multiplier: transaction.multiplier,
                              "Created At": new Date(transaction.createdAt).toLocaleString(),
                              "Updated At": new Date(transaction.updatedAt).toLocaleString(),
                              "Token Amount": transaction.tokenAmount ? `${transaction.tokenAmount} ${transaction.toCryptoCurrency}` : undefined,
                              "From Wallet Address": transaction.fromWalletAddress,
                              "To Wallet Address": transaction.toWalletAddress,
                              "From Chain": transaction.fromChain,
                              "To Chain": transaction.toChain,
                              "Social Post Required": transaction.socialPostRequired !== undefined ? (transaction.socialPostRequired ? "Yes" : "No") : undefined,
                              "Social Post Verified": transaction.socialPostVerified !== undefined ? (transaction.socialPostVerified ? "Yes" : "No") : undefined,
                              "Expires At": transaction.expiresAt ? new Date(transaction.expiresAt).toLocaleString() : undefined,
                              "Game ID": transaction.gameId,
                              "Referral ID": transaction.referralId,
                              Prize: transaction.metadata?.gameLeaderboardPrize?.prizeName,
                              Rank: transaction.metadata?.rank,
                            }).map(([label, value]) => (
                              value ? (
                                <React.Fragment key={label}>
                                  <span className="font-medium">{label}:</span>
                                  <span className="truncate">{value}</span>
                                </React.Fragment>
                              ) : null
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm mt-2">
                      {isFetching ? "Loading transactions..." : "No transactions found."}
                    </p>
                  )}
                  {isFetching && transactions.length > 0 && (
                    <p className="text-muted-foreground text-sm mt-2 text-center">
                      Loading more transactions...
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }
);

export default DialogViewUser;