import { TbCircleXFilled } from 'react-icons/tb';

import { AlertComponent } from '@/components/';

interface ErrorComponentPropsInterface {
  body: string;
}

export const ErrorComponent = ({ body }: ErrorComponentPropsInterface) => {
  return <AlertComponent body={body} Icon={TbCircleXFilled} className='bg-red-500' />;
};
