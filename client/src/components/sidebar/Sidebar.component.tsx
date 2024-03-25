import { useAuth } from '@/providers/Auth.provider';
import { IconType } from 'react-icons/lib';
import { TbLayoutGrid, TbBook2, TbBooks, TbFileUpload, TbSettings, TbUserCircle, TbLogout, TbSun, TbMoon } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

interface SidebarLinksInterface {
  name: string;
  icon: IconType;
  path: string;
}

export const SidebarComponent = () => {
  const { authLogout } = useAuth();

  const sidebarLinksMiddle: SidebarLinksInterface[] = [
    { name: 'Dashboard', icon: TbLayoutGrid, path: '/panel' },
    { name: 'Books', icon: TbBook2, path: '/books' },
    { name: 'Collections', icon: TbBooks, path: '/collections' },
    { name: 'Upload', icon: TbFileUpload, path: '/upload' },
    { name: 'Settings', icon: TbSettings, path: '/settings' },
    { name: 'Profile', icon: TbUserCircle, path: '/profile' },
  ];

  const handleLogout = async () => {
    await authLogout();
    console.log('Logout successfully.');
  };

  return (
    <aside className='sticky inset-x-0 top-0 flex flex-col items-start justify-between h-full min-h-screen gap-8 py-8 bg-white border-r w-52 dark:bg-slate-900 border-slate-300 dark:border-slate-700'>
      {/* Header */}
      <div className='inline-flex items-center gap-2 px-4'>
        <h3 className='text-2xl font-semibold'>Benco</h3>
      </div>
      {/* Body */}
      <div className='flex flex-col w-full gap-4 px-4'>
        {sidebarLinksMiddle.map((eachLink) => {
          const IconSidebar = eachLink.icon;
          return (
            <NavLink to={eachLink.path} key={eachLink.path} className={({ isActive }) => `transition-colors delay-75 inline-flex items-center gap-2 px-2 rounded-md py-2 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-500 ${isActive ? 'bg-slate-100 dark:bg-slate-800 dark:text-teal-500 text-teal-600' : 'text-slate-600'}`}>
              <IconSidebar size={22} />
              <p className='text-sm '>{eachLink.name}</p>
            </NavLink>
          );
        })}
      </div>
      {/* Utils */}
      <div className='flex flex-col w-full gap-4'>
        {/* Logout */}
        <button className='inline-flex gap-2 px-4 text-sm transition-colors delay-75 text-slate-600 dark:text-slate-200 dark:hover:text-teal-500 hover:text-teal-600' type='button' onClick={handleLogout}>
          <TbLogout size={22} />
          <p>Logout</p>
        </button>
        {/* Dark mode */}
        <div className='w-full px-4 rounded-sm' id='selectThemeDropdown'>
          <div className='inline-flex w-full gap-1 p-1 border rounded-md border-slate-300 dark:border-slate-700'>
            {/* Light */}
            <button className='inline-flex items-center justify-center w-1/2 gap-1 px-3 py-1.5 text-white bg-teal-600 rounded-md hs-dark-mode-active:bg-transparent hs-dark-mode-active:text-slate-200' data-hs-theme-click-value='default'>
              <TbSun size={18} />
              <span className='text-xs'>Light</span>
            </button>
            {/* Dark */}
            <button type='button' className='inline-flex justify-center items-center w-1/2 gap-1 px-2 py-1.5 rounded-md text-slate-600 dark:text-white hs-dark-mode-active:bg-teal-600' data-hs-theme-click-value='dark'>
              <TbMoon size={14} />
              <span className='text-xs'>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
