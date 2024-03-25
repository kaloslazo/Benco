import { PanelLayout } from '@/layouts/';

export const SettingsPage = () => {
  return (
    <PanelLayout>
      {/* Header */}
      <div className='pb-12'>
        <h3 className='text-2xl font-semibold text-black dark:text-white'>Settings</h3>
        <p className='dark:text-slate-300 text-slate-700'>Set your own preferences and customize the look of your dashboard.</p>
      </div>
      {/* Form */}
      <form>
        <div className='grid gap-2 sm:grid-cols-12 sm:gap-6'>
          {/* Appearance */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>Interface Theme</label>
          </div>

          <div className='sm:col-span-9' id='selectThemeDropdown'>
            <div className='relative flex items-center gap-5'>
              <div className='flex flex-col items-center gap-2'>
                <button type='button' className='relative w-64 overflow-hidden border-2 border-teal-600 rounded-lg h-30 hs-dark-mode-active:border-slate-700'>
                  <img src='images/lightDashboard.png' alt='Light Dashboard Preview' className='w-full h-full bg-cover ' data-hs-theme-click-value='default' />
                </button>
                <span className='text-sm font-normal text-teal-700 hs-dark-mode-active:text-slate-300'>Light</span>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <button type='button' className='relative w-64 overflow-hidden border-2 rounded-lg h-30 hs-dark-mode-active:border-teal-500 border-slate-300'>
                  <img src='images/darkDashboard.png' alt='Dark Dashboard Preview' className='w-full h-full bg-cover' data-hs-theme-click-value='dark' />
                </button>
                <span className='text-sm font-normal text-slate-700 hs-dark-mode-active:text-teal-500'>Dark</span>
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
          <button type='button' className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Cancel
          </button>
          <button type='button' className='inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 border border-transparent rounded-lg gap-x-2 hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Save changes
          </button>
        </div>
      </form>
    </PanelLayout>
  );
};
