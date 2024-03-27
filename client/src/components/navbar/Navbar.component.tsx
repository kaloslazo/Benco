import { TbBrandGithub, TbInfoCircle, TbLayoutSidebar, TbLogout, TbNotification, TbSettings, TbUserCircle } from 'react-icons/tb';

import { useAuth } from '@/providers';
import { ToggleThemeComponent, InputComponent, DropdownComponent } from '@/components';

const optionsDropdown = [
  { label: 'Profile', link: '/profile', icon: TbUserCircle },
  { label: 'Settings', link: '/settings', icon: TbSettings },
  { label: 'Logout', link: '/logout', icon: TbLogout },
];

export const NavbarComponent = () => {
  const twClassLayout = 'w-8 h-8 px-1 cursor-pointer rounded-md bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors ease-linear dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700';

  const { user } = useAuth();
  // todo: add user image profile

  return (
    <nav className='flex items-center justify-between w-full h-auto px-8 py-4 bg-white border-b max-h-24 border-slate-300 dark:bg-slate-900 dark:border-slate-700'>
      {/* Left options */}
      <div className='inline-flex items-center justify-center h-8 gap-4'>
        <TbLayoutSidebar className={twClassLayout} />
        <InputComponent id='search' classNameCustom='max-h-8 max-w-42 rounded-md' type='search' placeholder='Find books ...' onChangeFunc={() => {}} />
      </div>
      {/* Right options */}
      <div className='inline-flex gap-4'>
        <a href='https://github.com/kaloslazo/Benco/' target='_blank' rel='noopener' className='inline-flex items-center justify-center gap-2'>
          <TbInfoCircle className={twClassLayout} />
        </a>
        <a href='https://github.com/kaloslazo/Benco/' target='_blank' rel='noopener' className='inline-flex items-center justify-center gap-2'>
          <TbBrandGithub className={twClassLayout} />
        </a>
        <TbNotification className={twClassLayout} />
        <ToggleThemeComponent className={twClassLayout} />
        <DropdownComponent imagePath={'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'} className={twClassLayout} options={optionsDropdown} />
      </div>
    </nav>
  );
};
