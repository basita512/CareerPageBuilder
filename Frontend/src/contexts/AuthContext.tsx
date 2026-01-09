import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '@/services/authService';
import { toast } from 'sonner';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    companyId: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string, companyId: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthContextProvider');
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await authService.getProfile();
            setUser(response.data);
        } catch (error) {
            // Token is invalid or expired
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });

            // Store token and user data
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_data', JSON.stringify(response.data.user));

            setUser(response.data.user);
            toast.success('Welcome back!');
        } catch (error: any) {
            // Error managed by component
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string, companyId: string) => {
        try {
            const response = await authService.register({ email, password, name, companyId });

            // Auto-login after registration
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_data', JSON.stringify(response.data.user));

            setUser(response.data.user);
            toast.success('Account created successfully!');
        } catch (error: any) {
            // Error managed by component
            throw error;
        }
    };

    const logout = () => {
        localStorage.clear(); // Clear all local storage to ensure no sensitive data remains
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
