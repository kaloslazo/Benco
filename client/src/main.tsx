import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import '@/css/tailwind.css';
import App from './App';
import { ThemeProvider } from './providers/Theme.provider';
import { AuthProvider } from './providers/Auth.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
);
