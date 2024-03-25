interface InputComponentPropsInterface {
  type: string;
  placeholder: string;
  value?: string;
  className?: string;
  onChangeFunc?: (e?: any) => any;
}

export const InputComponent = ({ type = 'text', placeholder = 'Placeholder', value = '', onChangeFunc = () => {} }: InputComponentPropsInterface) => {
  return <input type={type} id='nickname' className='block w-full px-4 py-2 rounded-lg focus:ring-2 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-indigo-300 disabled:opacity-50 disabled:pointer-events-none' placeholder={placeholder} value={value} onChange={onChangeFunc} />;
};
