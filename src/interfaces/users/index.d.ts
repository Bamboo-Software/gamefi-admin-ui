declare global {
    export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    avatar:string
    email: string;
    role: string;
    pointsBalance: {
        $numberDecimal:string
    }
    lotteryEntries: number;
    emailVerified?: boolean;
    active?: boolean;
    lastLoginAt?: string;
    createdAt?:string
    }
}
export{}