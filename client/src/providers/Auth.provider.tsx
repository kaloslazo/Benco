import { createContext, useContext, useEffect, useState } from 'react';

import { getUserProfile } from '@/api/user/user.api';
import { login, logout } from '@/api/auth/auth.api';

interface AuthContextInterface {
  user: any;
  error: any;
  loading: boolean;
  authLogin: (nickname: string, password: string) => Promise<void>;
  authLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const authLogin = async (nickname: string, password: string) => {
    const userData = await login(nickname, password);
    setUser(userData);
  };

  const authLogout = async () => {
    await logout();
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      setUser(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, error, loading, authLogin, authLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
