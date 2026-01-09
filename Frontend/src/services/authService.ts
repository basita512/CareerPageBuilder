import apiClient from '@/lib/axiosConfig';

interface RegisterData {
    email: string;
    password: string;
    name: string;
    companyId: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            companyId: string;
        };
        token: string;
    };
    message?: string;
}

interface ProfileResponse {
    success: boolean;
    data: {
        id: string;
        email: string;
        name: string;
        role: string;
        companyId: string;
    };
}

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const authService = {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    /**
     * Login user
     */
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    /**
     * Get current user profile
     */
    async getProfile(): Promise<ProfileResponse> {
        const response = await apiClient.get<ProfileResponse>('/auth/profile');
        return response.data;
    },

    /**
     * Change user password
     */
    async changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.put('/auth/change-password', data);
        return response.data;
    },
};

export default authService;
