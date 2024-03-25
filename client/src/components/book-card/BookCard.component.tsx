import { Link } from 'react-router-dom';

export const BookCardComponent = ({ book }: { book: any }) => {
  return (
    <Link key={book.id} to={`/book/${book.id}`} className='relative block overflow-hidden transition duration-300 ease-in-out transform border rounded-lg shadow-lg border-slate-300 dark:border-slate-800 group h-80 hover:scale-105'>
      <img src={book.cover || 'https://www.hachettebookgroup.com/wp-content/uploads/2017/07/missingbook.png'} alt={book.title} className='absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-75' />
      <div className='absolute inset-0 transition-opacity duration-300 ease-in-out opacity-75 bg-gradient-to-b from-transparent to-gray-900 group-hover:opacity-90'></div>
      <div className='relative flex flex-col justify-end h-full p-4'>
        <h3 className='text-lg font-semibold text-white truncate'>{book.title}</h3>
        <p className='text-gray-300'>{book.author || 'No Author'}</p>
      </div>
    </Link>
  );
};
