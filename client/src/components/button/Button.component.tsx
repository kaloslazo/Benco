import { IconType } from 'react-icons/lib';

interface ButtonComponentPropsInterface {
  type: 'button' | 'submit' | 'reset';
  label: string;
  icon?: IconType | null;
  onClickFunc?: (e?: any) => any;
}

export const ButtonComponent = ({ label = '', type = 'button', icon = null, onClickFunc = () => {} }: ButtonComponentPropsInterface) => {
  return (
    <button type={type} onClick={onClickFunc} className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-500 transform bg-indigo-600 rounded-lg text-base- hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80'>
      {icon && <h3>HJola</h3>}
      <span className='mx-1'>{label}</span>
    </button>
  );
};
