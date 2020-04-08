import { CreditCard } from "./CreditCard";

export interface Member {
    id: string;
    name: string;
    password: string;
    email: string;
    zip: string;
    creditCard: CreditCard | null
}
