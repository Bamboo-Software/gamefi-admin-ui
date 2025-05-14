/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameDifficultyEnum } from "@/enums/game.enum";
declare global {
    export interface Game {
        _id: string;
        title: string;
        gameId: number;
        description: string;
        category: GameCategoryEnum;
        active: boolean;
        imageUrl: string;
        difficultyLevels: GameDifficultyEnum[];
        rules: string;
        version: string;
        url: string;
        requiredPoints: number;
        metadata: Record<string, any>;
        prizes: GameLeaderboardPrize[];
        createdAt: string;
        deletedAt?: string;
        updatedAt: string;
    }
    export interface GameLeaderboardPrize {
        _id:string
        gameId: string;
        minRank: number;
        maxRank: number;
        prizeName: string;
        prizeType: GameLeaderboardPrizeTypeEnum;
        amountAwarded: number;
        cryptoCurrency: CryptoCurrencyEnum;
        blockchainName: BlockchainNameEnum;
        active: boolean;
        metadata?: Record<string, any>;
        game?: Game;
    }
    export interface LotteryPrize {
        _id:string
        prizeName: string;
        prizeType: PrizeTypeEnum;
        amountAwarded: number;
        cryptoCurrency?: CryptoCurrencyEnum;
        blockchainName?: BlockchainNameEnum;
        probability: number;
        active?: boolean;
        metadata?: Record<string, any>;
    }
    export interface QueryGameRequest extends QueryRequest {
        active?: string;
    }

}
