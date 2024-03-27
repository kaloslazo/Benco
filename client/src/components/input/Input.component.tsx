interface InputComponentPropsInterface {
  type: string;
  placeholder?: string;
  id: string;
  value?: string | number;
  classNameCustom?: string | null;
  onChangeFunc?: (e?: any) => any;
}

export const InputComponent = ({ id = '', type = 'text', classNameCustom = '', placeholder = 'Placeholder', value = '', onChangeFunc = () => {} }: InputComponentPropsInterface) => {
  return (
    <input
      type={type}
      id={id}
      className={`bg-white dark:bg-slate-900 block w-full px-4 py-2 rounded-lg focus:ring-2 border-slate-300 dark:border-slate-700 text-slate-900 placeholder:text-slate-400 dark:text-slate-200 focus:border-indigo-600 focus:ring-indigo-300 dark:focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none ${classNameCustom}`}
      placeholder={placeholder}
      value={value}
      onChange={onChangeFunc}
    />
  );
};
