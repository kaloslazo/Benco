import axios from 'axios';
import { capitalizeFirstLetter } from './capitalizeFirstLetter.util';

export const getErrorMessage = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = String(error.response.data.message);
    return capitalizeFirstLetter(errorMessage);
  }

  if (error instanceof Error) {
    const errorMessage = String(error.message || 'Something went wrong.');
    return capitalizeFirstLetter(errorMessage);
  }
};
