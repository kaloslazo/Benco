export const LoadingComponent = () => {
  return (
    <div className='animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full dark:text-indigo-500' role='status' aria-label='loading'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};
