import { useState } from 'react';
import { TbUpload, TbX } from 'react-icons/tb';
import { BsFilePdfFill } from 'react-icons/bs';

import { uploadNewBook } from '@/api/books/book.api'; // Asegúrate de que la ruta es correcta
import { PanelLayout } from '@/layouts';
import { useErrorHandler } from '@/hooks';
import { ErrorComponent, SuccessComponent } from '@/components';

export const UploadPage = () => {
  const { error: uploadError, handleError: handleUploadError } = useErrorHandler();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState('0');
  const [cover, setCover] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const fileSizeConverted: string = (file.size / 1000000).toFixed(2);

    if (file) {
      setFile(file);
      setFileSize(fileSizeConverted);
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) setFile(file);
  };

  const handleUploadBook = async (e: any) => {
    e.preventDefault();
    handleUploadError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('cover', cover!);

    try {
      await uploadNewBook(formData);
      setSuccessMessage('Profile updated successfully.');
    } catch (error: any) {
      handleUploadError(error);
    }
  };

  return (
    <PanelLayout>
      <div className='pb-12'>
        <h3 className='text-2xl font-semibold text-black dark:text-white'>Upload</h3>
        <p className='dark:text-slate-300 text-slate-700'>Upload your book to the library</p>
      </div>

      <form onSubmit={handleUploadBook}>
        <div className='grid gap-2 sm:grid-cols-12 sm:gap-6'>
          {/* Title */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Title</label>
          </div>
          <div className='sm:col-span-9'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} id='title' type='text' className='block w-full px-3 py-2 text-sm rounded-lg shadow-sm border-slate-200 pe-11 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:focus:ring-slate-600' placeholder='Title' />
          </div>

          {/* Author */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Author</label>
          </div>
          <div className='sm:col-span-9'>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} id='author' type='text' className='block w-full px-3 py-2 text-sm rounded-lg shadow-sm border-slate-200 pe-11 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:focus:ring-slate-600' placeholder='Author' />
          </div>

          {/* Description */}
          <div className='sm:col-span-3'>
            <label htmlFor='af-account-desc' className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>
              Description
            </label>
          </div>
          <div className='sm:col-span-9'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id='af-account-desc'
              className='block w-full px-3 py-2 text-sm rounded-lg border-slate-200 focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:focus:ring-slate-600'
              rows={3}
              placeholder='Write about the book...'
            />
          </div>

          {/* Book File */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Book File</label>
            <span className='px-1 text-red-500'>*</span>
          </div>

          <div className='sm:col-span-9'>
            {file ? (
              <div className='inline-flex p-2.5 items-start justify-between w-full gap-2 text-center border-2 rounded-lg border-slate-200 group dark:border-slate-700'>
                <div className='inline-flex gap-4'>
                  <div className='flex items-center justify-center w-10 h-10 bg-teal-600 rounded-md'>
                    <BsFilePdfFill className='text-white' size={24} />
                  </div>
                  <span className='inline-flex gap-2 text-sm text-slate-700 dark:text-slate-200'>
                    <div className='flex flex-col items-start gap-2'>
                      <p className='font-normal text-slate-700 text-md'>{file?.name}</p>
                      <p className='text-xs text-slate-500'>{fileSize} Mb</p>
                    </div>
                  </span>
                </div>
                <button onClick={() => setFile(null)} className='text-red-500'>
                  <TbX size={24} />
                </button>
              </div>
            ) : (
              <label htmlFor='af-submit-app-upload-images' className='block p-4 text-center border-2 border-dashed rounded-lg cursor-pointer border-slate-300 group sm:p-7 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 dark:border-slate-700' onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <input id='af-submit-app-upload-images' name='af-submit-app-upload-images' type='file' className='sr-only' onChange={handleFileChange} accept='.pdf' />
                <TbUpload className='mx-auto text-slate-300 size-10 dark:text-slate-700' size={20} />
                <span className='block mt-2 text-sm text-slate-800 dark:text-slate-200'>
                  Browse your device or <span className='text-teal-600 group-hover:text-teal-700'>drag & drop your file</span>
                </span>
                <span className='block mt-1 text-xs text-slate-500 '>Only PDF files are allowed</span>
              </label>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end mt-6 gap-x-2'>
          <button type='button' className='inline-flex items-center px-4 py-2 text-sm font-medium bg-white border rounded-lg shadow-sm text-slate-800 border-slate-200 gap-x-2 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600'>
            Cancel
          </button>
          <button type='submit' className='inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 border border-transparent rounded-lg gap-x-2 hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600'>
            Save changes
          </button>
        </div>

        {/* Error */}
        {uploadError && <ErrorComponent body={uploadError} />}

        {/* Success */}
        {successMessage.length > 0 && <SuccessComponent body={successMessage} />}
      </form>
    </PanelLayout>
  );
};
