import { IconType } from 'react-icons/lib';
import { TbLayoutGrid, TbBook2, TbSettings, TbUserCircle, TbInfoCircle, TbHelp, TbBooks, TbUpload } from 'react-icons/tb';
import { NavLink, Link } from 'react-router-dom';

interface SidebarSectionInterface {
  title: string;
  links: SidebarLinkInterface[];
}

interface SidebarLinkInterface {
  name: string;
  icon: IconType;
  path: string;
}

export const SidebarComponent = () => {
  const sidebarSections: SidebarSectionInterface[] = [
    {
      title: 'General',
      links: [
        { name: 'Panel', icon: TbLayoutGrid, path: '/panel' },
        { name: 'Upload', icon: TbUpload, path: '/upload' },
        { name: 'Books', icon: TbBook2, path: '/books' },
        { name: 'Collections', icon: TbBooks, path: '/collections' },
      ],
    },
    {
      title: 'Tweaks',
      links: [
        { name: 'Settings', icon: TbSettings, path: '/settings' },
        { name: 'Profile', icon: TbUserCircle, path: '/profile' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'About', icon: TbInfoCircle, path: 'https://github.com/kaloslazo/Benco/tree/main' },
        { name: 'Support', icon: TbHelp, path: 'https://github.com/kaloslazo/Benco/tree/main' },
      ],
    },
  ];

  return (
    <aside className='sticky inset-x-0 top-0 flex flex-col items-start justify-start w-64 h-full min-h-screen gap-12 bg-white border-r dark:bg-slate-900 border-slate-300 dark:border-slate-700'>
      {/* Header */}
      <div className='flex flex-col items-start px-6 pt-4 h-14'>
        <h3 className='text-2xl font-extrabold'>Benco</h3>
        <span className='text-xs font-medium text-indigo-600 capitalize dark:text-indigo-400 '>Selfhosted Library</span>
      </div>
      {/* Body */}
      <div className='flex flex-col w-full gap-6 px-4'>
        {sidebarSections.map((section, idx) => (
          <div key={section.title} className={`flex flex-col gap-1 ${idx < 2 ? ' pb-4 border-b border-slate-300 dark:border-slate-700' : ''}`}>
            <p className='px-2 mb-2 text-xs font-normal uppercase section-title text-slate-500'>{section.title}</p>
            {section.links.map((eachLink) => (
              <NavLink key={eachLink.name} to={eachLink.path} className={({ isActive }) => `inline-flex items-center justify-start w-full gap-2 px-2 py-1.5 rounded-md dark:hover:bg-slate-800 dark:hover:text-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-colors delay-100 ease-linear ${isActive && 'bg-indigo-50 text-indigo-700 dark:text-indigo-400 dark:bg-slate-800'}`}>
                <eachLink.icon size={18} />
                <span className='link-name'>{eachLink.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};
