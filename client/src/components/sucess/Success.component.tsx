import { TbCheck } from 'react-icons/tb';

import { AlertComponent } from '@/components/';

interface SuccessComponentPropsInterface {
  body: string;
}

export const SuccessComponent = ({ body }: SuccessComponentPropsInterface) => {
  return <AlertComponent body={body} Icon={TbCheck} className='bg-teal-600' />;
};
