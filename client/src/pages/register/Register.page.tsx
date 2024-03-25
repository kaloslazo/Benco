import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useErrorHandler } from '@/hooks';
import { AuthFormComponent } from '@/components';
import { register } from '@/api/auth/auth.api';
import { useAuth } from '@/providers/Auth.provider';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { error: registerError, handleError: handleRegisterError } = useErrorHandler();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) navigate('/panel');
  }, [user, navigate]);

  const handleRegister = async (event: any) => {
    handleRegisterError('');
    event.preventDefault();

    try {
      if (nickname === '' || password === '' || email === '') return;
      await register(nickname, email, password);
      navigate('/login');
    } catch (error) {
      handleRegisterError(error);
    }
  };

  return <AuthFormComponent handleFormSubmit={handleRegister} isRegister={true} nickname={nickname} password={password} email={email} error={registerError} setNickname={setNickname} setPassword={setPassword} setEmail={setEmail} />;
};
