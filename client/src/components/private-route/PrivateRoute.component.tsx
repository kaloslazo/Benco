import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/providers/Auth.provider';

export const PrivateRouteComponent = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  console.log(user, loading);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to='/login' />;

  return <>{children}</>;
};
