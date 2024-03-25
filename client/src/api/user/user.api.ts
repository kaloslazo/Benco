import { getErrorMessage } from '@/utils';
import { axiosInstance } from '@/configs/axios.config';

export const getUserProfile = async () => {
  try {
    const responseGetUserProfile = await axiosInstance.get('/users');
    console.log('responseGetUserProfile', responseGetUserProfile.data);
    return responseGetUserProfile.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - User.get]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};

export const updateUserProfile = async (nickname: string, email: string, password: string) => {
  try {
    const responseUpdateUserProfile = await axiosInstance.put('/users', { nickname, email, password });
    console.log('responseUpdateUserProfile', responseUpdateUserProfile.data);
    return responseUpdateUserProfile.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - User.update]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};
