import { EnvInterface } from '@/common/interfaces/env.interface';

export const envConfig: EnvInterface = {
  dbUrl: import.meta.env.VITE_DB_URL,
  dbJwtSecret: import.meta.env.VITE_DB_JWT_SECRET,
};
