/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
   export interface Transaction {
  id: string;
  _id: string;
  userId: string;
  gameId?: string;
  referralId?: string;
  type: string;
  status: string;
  earnPoints: number;
  spendPoints: number;
  tokenAmount?: number;
  multiplier: number;
  createdAt: string;
  updatedAt: string;
  metadata: {
    description: string;
    [key: string]: any;
  };
}
}
export{}