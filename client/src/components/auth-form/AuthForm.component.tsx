import { Link } from 'react-router-dom';
import { ErrorComponent } from '../error/Error.component';

interface AuthFormComponentPropsInterface {
  isRegister: boolean;
  handleFormSubmit: (event: any) => Promise<void>;
  setNickname: any;
  nickname: string;
  setPassword: any;
  password: string;
  setEmail?: any;
  email?: string;
  error?: string;
}

export const AuthFormComponent = ({ isRegister, handleFormSubmit, nickname, setNickname, setPassword, password, setEmail, email, error }: AuthFormComponentPropsInterface) => {
  const currentFormTitle = isRegister ? 'Register' : 'Login';
  const currentFormMessage = isRegister ? 'Already have an account?' : "Don't have an account yet?";
  const currentFormContrary = isRegister ? 'Login' : 'Register';
  const currentFormLink = isRegister ? '/login' : '/register';

  return (
    <div className='w-full h-full py-16'>
      <div className='flex flex-col items-center justify-center w-full max-w-sm p-6 py-8 mx-auto bg-white border-2 border-gray-200 rounded-lg shadow-sm'>
        {/* Hero title */}
        <div className='w-full mb-6 text-center'>
          <h3 className='block my-2 text-2xl font-bold text-center text-gray-800 dark:text-white'>{currentFormTitle}</h3>
          <span className='inline-flex items-center gap-1 text-sm text-gray-600'>
            <p>{currentFormMessage}</p>
            <Link className='font-medium text-teal-600 decoration-2 hover:underline' to={currentFormLink}>
              {currentFormContrary}
            </Link>
          </span>
        </div>
        {/* Hero body */}
        <form onSubmit={handleFormSubmit} className='grid w-full gap-y-4'>
          <div>
            <input type='text' id='nickname' className='block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600' placeholder='Nickname' value={nickname} onChange={(event) => setNickname(event.target.value)} />
          </div>
          <div>
            <input type='password' id='password' className='block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {isRegister && (
            <div>
              <input type='email' id='email' className='block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          )}
          <button type='submit' className='inline-flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-teal-600 border border-transparent rounded-lg gap-x-2 hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            {currentFormTitle}
          </button>
        </form>
        {/* Error */}
        {error && <ErrorComponent title='Error' body={error} />}
      </div>
    </div>
  );
};
