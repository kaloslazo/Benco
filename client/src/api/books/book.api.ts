import { getErrorMessage } from '@/utils';
import { axiosInstance } from '@/configs/axios.config';

export const getBooks = async () => {
  try {
    const responseGetBooks = await axiosInstance.get('/books');
    console.log('responseBooks', responseGetBooks.data);
    return responseGetBooks.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Books.get]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};

export const getBookById = async (id: string) => {
  try {
    const responseBookById = await axiosInstance.get(`/books/${id}`);
    console.log('responseBookById', responseBookById.data);
    return responseBookById.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Book.getById]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};

export const uploadNewBook = async (formData: any) => {
  try {
    const responseUploadNewBook = await axiosInstance.post('/books/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('responseUploadNewBook', responseUploadNewBook.data);
    return responseUploadNewBook.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('[Error - Book.upload]', error);
      throw new Error(getErrorMessage(error));
    }
  }
};
