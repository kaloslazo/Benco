import { useEffect, useState } from 'react';

import { PanelLayout } from '@/layouts/';
import { getBooks } from '@/api/books/book.api';
import { LoadingComponent } from '@/components/loading/Loading.component';
import { BookCardComponent } from '@/components/book-card/BookCard.component';

export const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <PanelLayout>
      {/* Header */}
      <div className='pb-8'>
        <h3 className='text-2xl font-semibold text-black dark:text-white'>Books</h3>
        <p className='dark:text-slate-400 text-slate-600'>List of books available in the library</p>
      </div>
      {loading && <LoadingComponent />}
      {!loading && (
        <div className='grid items-stretch grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {books.map((book: any) => (
            <BookCardComponent key={book.id} book={book} />
          ))}
        </div>
      )}
    </PanelLayout>
  );
};
