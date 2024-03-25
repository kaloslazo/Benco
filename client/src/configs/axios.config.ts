import axios, { isAxiosError } from 'axios';
import { envConfig } from './env.config';

export const axiosInstance = axios.create({
  baseURL: envConfig.dbUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.isAxiosError = isAxiosError;
