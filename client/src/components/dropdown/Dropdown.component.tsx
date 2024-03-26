import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers';

interface DropdownComponentPropsInterface {
  imagePath?: string;
  text?: string;
  className?: string;
  options: any[];
}

export const DropdownComponent = ({ imagePath, text = 'text', className, options }: DropdownComponentPropsInterface) => {
  const { authLogout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleLogout = async (text: string) => {
    if (text === 'Logout') {
      await authLogout();
      navigate('/login');
      console.log('Logout successfully.');
    }
  };

  return (
    <div className='relative inline-block text-left'>
      {/* Button */}
      <button type='button' className='w-8 h-8 overflow-hidden bg-red-500 border-2 rounded-full border-slate-200' onClick={handleOpen}>
        <img src={imagePath} alt='user image' />
      </button>
      {/* Menu */}
      {isOpen && (
        <div className='absolute right-0 z-10 w-40 mt-2 overflow-hidden origin-top-right bg-white border rounded-lg shadow-lg border-slate-300 dark:bg-slate-900 dark:text-slate-200 text-slate-600 dark:border-slate-700' role='menu'>
          {options.map((eachOption, index) => {
            const IconMenu = eachOption.icon;
            return (
              <NavLink onClick={(e: any) => handleLogout(eachOption.label)} to={eachOption.link} key={index} className='inline-flex items-center justify-start w-full gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800' role='menuitem'>
                <IconMenu size={16} />
                <p>{eachOption.label}</p>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};
