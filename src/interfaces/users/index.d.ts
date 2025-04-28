import { RoleTypeEnum } from "@/enums/user.enums";

declare global {
    export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    avatar:string
    email: string;
    role: RoleTypeEnum;
    pointsBalance: {
        $numberDecimal:string
    }
    lotteryEntries: number;
    emailVerified?: boolean;
    active: boolean;
    lastLoginAt?: string;
    deletedAt?: string;
    createdAt?:string
    }
}
export{}