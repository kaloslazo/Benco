import { SidebarComponent } from '@/components/';

export const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row w-full gap-4 mx-auto bg-inherit'>
      <SidebarComponent />
      <main className='w-full max-w-4xl px-8 py-8 mx-auto my-8 dark:border-slate-700'>{children}</main>
    </div>
  );
};
