import { SidebarComponent } from '@/components/';
import { NavbarComponent } from '../components/navbar/Navbar.component';

export const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row w-full mx-auto bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50'>
      <SidebarComponent />
      <section className='flex flex-col w-full h-full'>
        <NavbarComponent />
        <div className='w-full max-w-4xl px-8 py-8 mx-auto'>{children}</div>
      </section>
    </div>
  );
};
