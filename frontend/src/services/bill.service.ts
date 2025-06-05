import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = 'http://' + window.location.host + '/api/v1/';

// Add a request interceptor to include the token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 Unauthorized
axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized error
            console.error('Authentication required');
            // You might want to redirect to login page or show a login modal
        }
        return Promise.reject(error);
    }
);

export interface BillItemResponse {
    name: string;
    number: string;
    bank: string;
    amount: number;
    currency: string;
    rate: number;
}

export interface CardItemResponse {
    cardType: string;
    number: string;
    bank: string;
    amount: number;
    currency: string;
}

export interface BillResponse {
    balance: number;
    billsBalance: number;
    cardsBalance: number;

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