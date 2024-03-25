import { Link } from 'react-router-dom';

import { ButtonComponent, InputComponent, ErrorComponent } from '@/components';

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

interface FormDataInterface {
  title: string;
  btnLabel: string;
  message: string;
  contrary: string;
  help: string;
  link: string;
}

export const AuthFormComponent = ({ isRegister, handleFormSubmit, nickname, setNickname, setPassword, password, setEmail, email, error }: AuthFormComponentPropsInterface) => {
  const currentFormData: FormDataInterface = {
    title: isRegister ? 'Join Benco Now 📚' : 'Welcome back! 👋',
    btnLabel: isRegister ? 'Register' : 'Login',
    message: isRegister ? 'Start your journey with us and start organizing your library.' : 'Log in to continue your reading adventure',
    help: isRegister ? 'Already have an account?' : "Don't have an account?",
    contrary: isRegister ? 'Sign In' : 'Create an Account',
    link: isRegister ? '/login' : '/register',
  };

  return (
    <div className='flex flex-row w-full h-full max-h-screen min-h-screen px-8'>
      {/*  Left child */}
      <div className='flex flex-col items-start justify-center w-full max-w-md gap-8 px-8 py-8 mx-auto md:w-3/4'>
        {/* Form title */}
        <div className='text-left'>
          <h3 className='mb-4 text-4xl font-bold text-slate-900'>{currentFormData.title}</h3>
          <p className='text-base text-slate-800'>{currentFormData.message}</p>
        </div>
        {/* Form body */}
        <form onSubmit={handleFormSubmit} className='grid w-full gap-y-4'>
          <InputComponent type='text' placeholder='Nickname' value={nickname} onChangeFunc={(event: any) => setNickname(event.target.value)} />
          <InputComponent type='password' placeholder='Password' value={password} onChangeFunc={(event: any) => setPassword(event.target.value)} />
          {isRegister && <InputComponent type='email' placeholder='Email' value={email} onChangeFunc={(event: any) => setEmail(event.target.value)} />}
          <ButtonComponent type='submit' label={currentFormData.btnLabel} />
        </form>
        {/* Form links */}
        <div>
          <span className='inline-flex items-center gap-1 text-sm text-gray-800'>
            <p>{currentFormData.help}</p>
            <Link className='font-medium text-indigo-600 hover:underline hover:decoration-wavy' to={currentFormData.link}>
              {currentFormData.contrary}
            </Link>
          </span>
        </div>
        {/* Error */}
        {error && <ErrorComponent body={error} />}
      </div>
      {/* Right child */}
      <div className='hidden py-8 pl-8 lg:w-2/4 lg:flex'>
        <div className='relative w-full h-full overflow-hidden rounded-3xl'>
          <div className='absolute top-0 left-0 w-full h-full px-12'>
            <div className='flex flex-col items-center justify-center h-full gap-8'>
              <div className='w-full max-w-lg mx-auto'>
                <h3 className='mb-4 text-3xl font-bold text-white lg:text-4xl'>
                  The best way to manage your books it's with <span className='underline decoration-wavy decoration-indigo-300'>Benco</span>
                </h3>
                <h5 className='text-base lg:text-lg text-slate-200'>A Open Source solution for handle your selfhosted library, aims to be simple, easy to use and fast as a rocket 🚀</h5>
              </div>
              <img className='w-full max-w-xs mx-auto shadow-2xl lg:max-w-xl rounded-xl' src='https://i.pinimg.com/736x/dc/28/7f/dc287f53a32c3c24b75bc1cc154ebdf5.jpg' alt='dashboard preview image' />
            </div>
          </div>
          <img className='object-cover w-full h-full' src='public/svg/gradientIndigo.svg' alt='gradient indigo wallpaper' />
        </div>
      </div>
    </div>
  );
};
