import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRouteComponent } from '@/components';
import { PanelPage, NotFoundPage, LoginPage, RegisterPage, BooksPage, CollectionsPage, UploadPage, SettingsPage, ProfilePage } from '@/pages/';
import { BookPage } from '@/pages/book/Book.page';

export const Router = () => {
  return (
    <Routes>
      {/* General routes */}
      <Route path='/' element={<Navigate to={'/panel'} replace />} />
      <Route path='/panel' element={<PrivateRouteComponent children={<PanelPage />} />} />
      <Route path='/books' element={<PrivateRouteComponent children={<BooksPage />} />} />
      <Route path='/collections' element={<PrivateRouteComponent children={<CollectionsPage />} />} />
      <Route path='/upload' element={<PrivateRouteComponent children={<UploadPage />} />} />
      <Route path='/settings' element={<PrivateRouteComponent children={<SettingsPage />} />} />
      <Route path='/profile' element={<PrivateRouteComponent children={<ProfilePage />} />} />
      <Route path='/book/:bookId' element={<PrivateRouteComponent children={<BookPage />} />} />

      {/* Auth routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Auxiliar routes */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
