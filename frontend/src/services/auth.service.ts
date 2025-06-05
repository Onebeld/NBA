import axios from 'axios';

const API_URL = 'http://' + window.location.host + '/auth/';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

class AuthService {
    /**
     * Login user and store the JWT token
     */
    async login(username: string, password: string): Promise<AuthResponse> {
        const response = await axios.post<AuthResponse>(
            `${API_URL}login`,
            { username, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    }

    async register(username: string, email: string, password: string, firstName: string, lastName: string, phone: string): Promise<AuthResponse> {
        const response = await axios.post<AuthResponse>(
            `${API_URL}register`,
            { username, email, password, firstName, lastName, phone },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    }

    /**
     * Logout user and remove the JWT token
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    /**
     * Get the current user from localStorage
     */
    getCurrentUser(): AuthResponse | null {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    }

    /**
     * Get the JWT token from localStorage
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }
}

export default new AuthService();
