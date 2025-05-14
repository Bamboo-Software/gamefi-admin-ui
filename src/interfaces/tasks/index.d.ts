import { TaskTypeEnum } from "@/enums/task.enums";

declare global {
    export interface Task {
    _id: string;
    title: string;
    description: string;
    frequency: TaskFrequencyEnum;
    pointsReward: number |undefined;
    rewardDetails: string;
    type: TaskTypeEnum;
    actionUrl: string;
    requiredCount: number;
    active: boolean;
    socialTaskType: SocialTaskTypeEnum;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
    }
    export interface QueryTaskRequest extends QueryRequest{
        active?: string;
        type?: TaskTypeEnum;
        socialTaskType?: SocialTaskTypeEnum;
        title?: string;
        email?: string;
        username?: string
    }

}
export{}