export interface SelectCardResponse {
    id: number;
    bank: string;
    number: string;
    cardType: string;
}

export interface CardsInfoResponse {
    balance: number;
    income: number;
    expense: number;
    currency: string;
}