import axios, { AxiosResponse } from 'axios';
import {Currency} from "../entities/currency.ts";

const API_URL = 'http://' + window.location.host + '/api/v1/';

export interface BillItemResponse {
    name: string;
    number: string;
    bank: string;
    amount: number;
    currency: Currency;
    rate: number;
}

export interface CardItemResponse {
    cardType: string;
    number: string;
    bank: string;
    amount: number;
    currency: Currency;
}

export interface BillResponse {
    balance: number;
    billsBalance: number;
    cardsBalance: number;
    currency: string;

    bills: BillItemResponse[];
    cards: CardItemResponse[];
}

class BillService {
    /**
     * Fetches the bill information from the server
     * @returns Promise resolving to BillResponse
     * @throws {AxiosError} If the request fails
     */
    async getBill(): Promise<BillResponse> {
        try {
            const response: AxiosResponse<BillResponse> = await axios.get<BillResponse>(
                `${API_URL}bills`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle specific error statuses if needed
                if (error.response?.status === 404) {
                    // Handle not found
                    console.error('Bills endpoint not found');
                }
                // Re-throw the error to be handled by the caller
                throw error;
            }
            // For non-Axios errors
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}

export default new BillService();