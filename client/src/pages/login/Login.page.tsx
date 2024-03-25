import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers/Auth.provider';
import { AuthFormComponent } from '@/components';
import { useErrorHandler } from '@/hooks';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { authLogin, user } = useAuth();
  const { error: loginError, handleError: handleLoginError } = useErrorHandler();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigate('/panel');
  }, [user, navigate]);

  const handleLogin = async (event: any) => {
    handleLoginError('');
    event.preventDefault();

    try {
      if (nickname === '' || password === '') return;
      await authLogin(nickname, password);
      navigate('/panel');
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  return <AuthFormComponent handleFormSubmit={handleLogin} isRegister={false} nickname={nickname} password={password} error={loginError} setNickname={setNickname} setPassword={setPassword} />;
};
