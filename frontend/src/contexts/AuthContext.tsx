import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import authService, { User } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authService.login(username, password);
    setUser({
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      phone: response.phone
    });
  };

  const register = async (username: string, email: string, password: string, firstName: string, lastName: string, phone: string) => {
    const response = await authService.register(username, email, password, firstName, lastName, phone);
    setUser({
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
