import {SelectCardResponse} from "./cards.ts";

export interface SelectBillResponse {
    id: number;
    name: string;
    number: string;
}

export interface SelectBillsResponse {
    bills: SelectBillResponse[];
    cards: SelectCardResponse[];
}