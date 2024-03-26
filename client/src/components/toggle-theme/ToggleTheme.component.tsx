import { useTheme } from '@/providers';
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb';

export const ToggleThemeComponent = ({ className }: { className: string }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`inline-flex ${className} items-center justify-center`} onClick={toggleTheme}>
      {isDarkMode ? <TbSunFilled className='w-7' /> : <TbMoonFilled className='w-6' />}
    </div>
  );
};
