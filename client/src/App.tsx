import 'preline/preline';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Router } from '@/router';
import '@/common/global/globals.d.ts';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className='w-full h-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50'>
      <Router />
    </main>
  );
};

export default App;
