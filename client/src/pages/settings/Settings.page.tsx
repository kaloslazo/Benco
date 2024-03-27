import { useTheme } from '@/providers';
import { PanelLayout } from '@/layouts/';
import { ButtonComponent } from '../../components/button/Button.component';

export const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <PanelLayout>
      {/* Header */}
      <div className='pb-12'>
        <h3 className='text-2xl font-semibold text-black dark:text-white'>Settings</h3>
        <p className='dark:text-slate-300 text-slate-700'>Set your own preferences and customize the look of your dashboard.</p>
      </div>
      {/* Form */}
      <form className='w-full'>
        <div className='grid w-full gap-2 sm:grid-cols-12 sm:gap-6'>
          {/* Appearance */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>Interface Theme</label>
          </div>

          <div className='sm:col-span-9' id='selectThemeDropdown'>
            <div className='relative flex items-center gap-5'>
              <div className='flex flex-col items-center gap-2'>
                <button onClick={toggleTheme} type='button' className='relative w-full overflow-hidden border-2 border-indigo-600 rounded-lg dark:border-transparent h-30 hs-dark-mode-active:border-slate-700'>
                  <img src='images/lightDashboard.png' alt='Light Dashboard Preview' className='w-full h-full bg-cover ' />
                </button>
                <span className='text-sm font-normal text-indigo-700 dark:text-slate-400 hs-dark-mode-active:text-slate-300'>Light</span>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <button onClick={toggleTheme} type='button' className='relative w-full overflow-hidden border-2 rounded-lg dark:border-indigo-500 h-30 hs-dark-mode-active:border-indigo-500 border-slate-300'>
                  <img src='images/darkDashboard.png' alt='Dark Dashboard Preview' className='w-full h-full bg-cover' />
                </button>
                <span className='text-sm font-normal text-slate-900 dark:text-indigo-500 hs-dark-mode-active:text-indigo-500'>Dark</span>
              </div>
            </div>
          </div>

          {/* Under development */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>New features under development...</label>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end mt-6 gap-x-2'>
          <ButtonComponent label='Save Changes' type='button' />
        </div>
      </form>
    </PanelLayout>
  );
};
