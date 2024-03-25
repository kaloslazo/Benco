import { useState } from 'react';
import { TbUpload } from 'react-icons/tb';

import { useErrorHandler } from '@/hooks';
import { PanelLayout } from '@/layouts/';
import { useAuth } from '@/providers/';
import { updateUserProfile } from '@/api/user/user.api';
import { ErrorComponent } from '@/components/error/Error.component';
import { SuccessComponent } from '@/components';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { error: updateError, handleError: handleUpdateError } = useErrorHandler();

  const [newNickname, setNewNickname] = useState<string>(user.nickname || '');
  const [newEmail, setNewEmail] = useState<string>(user.email || '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSaveChanges = async (event: any) => {
    handleUpdateError('');
    setSuccessMessage('');

    try {
      event.preventDefault();
      await updateUserProfile(newNickname, newEmail, newPassword);
      setSuccessMessage('Profile updated successfully.');
    } catch (error: any) {
      handleUpdateError(error);
    }
  };

  return (
    <PanelLayout>
      {/* Header */}
      <div className='pb-12'>
        <h3 className='text-2xl font-semibold text-black dark:text-white'>Profile</h3>
        <p className='dark:text-slate-300 text-slate-700'>Manage your name, password and account settings.</p>
      </div>
      {/* Form */}
      <form onSubmit={handleSaveChanges}>
        <div className='grid gap-2 sm:grid-cols-12 sm:gap-6'>
          {/* Profile Photo */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>Profile photo</label>
          </div>

          <div className='sm:col-span-9'>
            <div className='flex items-center gap-5'>
              <img className='inline-block rounded-full size-14 ring-2 ring-white dark:ring-gray-800' src='https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif' alt='Image Description' />
              <div className='flex gap-x-2'>
                <button type='button' className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                  <TbUpload size={16} />
                  Upload photo
                </button>
              </div>
            </div>
          </div>

          {/* Full name */}
          <div className='sm:col-span-3'>
            <label htmlFor='nickname' className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
              Nickname
            </label>
          </div>

          <div className='sm:col-span-9'>
            <input value={newNickname} onChange={(e) => setNewNickname(e.target.value)} id='nickname' type='text' className='block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-slate-300 dark:focus:ring-gray-600' placeholder='Nickname' />
          </div>

          {/* Email */}
          <div className='sm:col-span-3'>
            <label htmlFor='email' className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
              Email
            </label>
          </div>

          <div className='sm:col-span-9'>
            <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} id='email' type='email' className='block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-slate-300 dark:focus:ring-gray-600' placeholder='Email' />
          </div>

          {/* Password */}
          <div className='sm:col-span-3'>
            <label htmlFor='password' className='inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200'>
              Password
            </label>
          </div>

          <div className='sm:col-span-9'>
            <div className='space-y-2'>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id='password'
                type='password'
                className='block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-slate-300 dark:focus:ring-gray-600'
                placeholder='Enter new password'
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end mt-6 gap-x-2'>
          <button type='button' className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Cancel
          </button>
          <button type='submit' className='inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 border border-transparent rounded-lg gap-x-2 hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Save changes
          </button>
        </div>

        {/* Error */}
        {updateError && <ErrorComponent body={updateError} />}

        {/* Success */}
        {successMessage.length > 0 && <SuccessComponent body={successMessage} />}
      </form>
    </PanelLayout>
  );
};
