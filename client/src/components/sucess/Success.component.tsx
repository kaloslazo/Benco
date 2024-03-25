import { TbCheck } from 'react-icons/tb';

interface SuccessComponentPropsInterface {
  title?: string;
  body: string;
}

export const SuccessComponent = ({ title = 'Success', body }: SuccessComponentPropsInterface) => {
  return (
    <div className='w-full px-2 py-2 mt-4 text-sm text-green-800 border border-green-600 rounded-lg bg-green-50 dark:bg-green-800/30 dark:border-green-600 dark:text-green-500' role='alert'>
      <div className='inline-flex items-start gap-2'>
        <TbCheck className='flex-shrink-0' size={20} />
        <div>
          <h3 className='text-sm font-bold'>{title}</h3>
          <div className='mt-1 text-xs font-normal'>{body}</div>
        </div>
      </div>
    </div>
  );
};
