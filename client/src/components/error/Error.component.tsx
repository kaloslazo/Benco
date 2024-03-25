import { TbAlertTriangleFilled } from 'react-icons/tb';

interface ErrorComponentPropsInterface {
  title?: string;
  body: string;
}

export const ErrorComponent = ({ title = 'Error', body }: ErrorComponentPropsInterface) => {
  return (
    <div className='w-full px-2 py-2 mt-4 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500' role='alert'>
      <div className='inline-flex items-start gap-2'>
        <TbAlertTriangleFilled className='flex-shrink-0' size={20} />
        <div>
          <h3 className='text-sm font-bold'>{title}</h3>
          <div className='mt-1 text-xs font-normal'>{body}</div>
        </div>
      </div>
    </div>
  );
};
