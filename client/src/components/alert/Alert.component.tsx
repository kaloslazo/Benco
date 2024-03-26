import { useEffect, useState } from 'react';

interface ErrorComponentPropsInterface {
  Icon?: any;
  body: string;
  className: string;
}

export const AlertComponent = ({ body, Icon, className }: ErrorComponentPropsInterface) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(false);

    const timeoutId = setTimeout(() => setVisible(true), 500);
    const hideTimer = setTimeout(() => setVisible(false), 5000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimer);
    };
  }, [body]);

  return body ? (
    <div className={`fixed z-10 w-auto max-w-sm px-4 py-4 text-white rounded-lg shadow-lg bottom-4 right-4 transform transition-opacity duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'} ${className}`} role='alert'>
      <div className='flex items-center justify-center gap-2'>
        <Icon className='flex-shrink-0 w-8 h-8 text-white' />
        <p className='text-sm'>{body}</p>
      </div>
    </div>
  ) : null;
};
