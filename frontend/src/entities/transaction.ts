import {Organization} from "./organization.ts";

export interface TransactionItem {
    id: number;
    dateTime: Date;
    currency: string;
    operation: string;
    amount: number;
    transactionType: string;
    organization: Organization;
}

export interface TransactionTypeResponse {
    id: number;
    name: string;
}