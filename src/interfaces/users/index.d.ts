/* eslint-disable @typescript-eslint/no-explicit-any */

import { RoleTypeEnum } from "@/enums/user.enums";

declare global {
    export interface User {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        name: string;
        email:string
        emailVerified: boolean;
        phoneVerified: boolean;
        active: boolean;
        telegramLanguageCode: string;
        avatar: string;
        role: RoleTypeEnum;
        isTelegramPremium: boolean | null;
        estimatedTelegramAccountAge: string;
        isOnboarded: boolean;
        pointsBalance: {
            $numberDecimal:string
        };
        timezone: string;
        lastLoginAt: string;
        failedLoginAttempts: number;
        lotteryEntries: number;
        doublePointsActive: boolean;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        referralCode: string;
        isBot: boolean;
        fullName: string;
        transactionCount: number;
        referralCount: number;
        socials: Social[];
        transactions: Transaction[];
    }
    export interface CreateUserRequest{
        page?: number;
        q?: string;
        email?: string;
        limit?: number;
        role?: string;
        active?: string;
        offset?: number;
        orderField?: string;
        orderDirection?: string;
        username?: string;
        isBot?: boolean
    }
}
export{}