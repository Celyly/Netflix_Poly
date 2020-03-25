import { Member } from "./Member";

export interface MemberMonthly extends Member {
    subscriptionPrice: number;
    startDate: string;
    dueDate: string;
}
