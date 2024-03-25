import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBookById } from '@/api/books/book.api';
import { useErrorHandler } from '@/hooks';
import { ErrorComponent, ViewerComponent } from '@/components';
import { LoadingComponent } from '@/components/loading/Loading.component';

interface BookDataInterface {
  bookUrl: string | null;
  bookTitle: string | null;
  bookAuthor: string | null;
}

export const BookPage = () => {
  const { error: bookError, handleError: handleBookError } = useErrorHandler();
  const { bookId } = useParams();

  const [bookData, setBookData] = useState<BookDataInterface>({ bookUrl: null, bookTitle: null });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBookById = async () => {
    setLoading(true);
    try {
      const response = await getBookById(bookId!);
      setBookData({
        bookUrl: response.pdfUrl,
        bookTitle: response.title,
        bookAuthor: response.author,
      });
    } catch (error: any) {
      handleBookError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}
      {!loading && bookData && <ViewerComponent bookUrl={bookData.bookUrl!} bookTitle={bookData.bookTitle!} bookAuthor={bookData.bookAuthor!} />}
      {bookError && <ErrorComponent body={bookError} />}
    </>
  );
};
