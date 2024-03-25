import { useCallback, useState } from 'react';

import { getErrorMessage } from '@/utils';

export const useErrorHandler = () => {
  const [error, setError] = useState<string>('');

  const handleError = useCallback((message: string) => {
    const errorMessage = getErrorMessage(message);
    setError(errorMessage!);
  }, []);

  return { error, handleError };
};
