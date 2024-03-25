import { getErrorMessage } from '@/utils';
import { axiosInstance } from '@/configs/axios.config';

export const login = async (nickname: string, password: string) => {
  try {
    const responseLogin = await axiosInstance.post('/auth/login', { nickname, password });
    console.log('responseLogin', responseLogin.data);
    return responseLogin.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Auth.login]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};

export const register = async (nickname: string, email: string, password: string) => {
  try {
    const responseRegister = await axiosInstance.post('/auth/register', { nickname, email, password });
    console.log('responseRegister', responseRegister.data);
    return responseRegister.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Auth.register]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};

export const logout = async () => {
  try {
    const responseLogout = await axiosInstance.post('/auth/logout');
    return responseLogout.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Auth.logout]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};
