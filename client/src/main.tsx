import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import '@/css/tailwind.css';
import App from './App';
import { AuthProvider } from './providers/Auth.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);
