import { Link } from 'react-router-dom';

export const BookCardComponent = ({ book }: { book: any }) => {
  return (
    <Link key={book.id} to={`/book/${book.id}`} className='flex flex-col items-stretch gap-4 px-2 py-2 bg-white border rounded-lg dark:border-slate-700 border-slate-300 dark:bg-slate-800'>
      <div className='flex-grow overflow-hidden border rounded-lg border-slate-300 dark:border-slate-700 h-60'>
        <img src={book.cover || 'https://www.hachettebookgroup.com/wp-content/uploads/2017/07/missingbook.png'} alt={book.title} className='object-cover w-full h-full transition-transform delay-100 hover:scale-110' />
      </div>
      <div>
        <h3 className='h-12 mb-2 text-base font-semibold transition-colors ease-in-out delay-100 text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400'>{book.title}</h3>
        <p className='text-xs truncate text-slate-600 dark:text-slate-400 line-clamp-1'>{book.author || 'No Author'}</p>
      </div>
    </Link>
  );
};
