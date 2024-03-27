import { useState } from 'react';
import { TbUpload, TbX } from 'react-icons/tb';
import { BsFilePdfFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { uploadNewBook } from '@/api/books/book.api'; // Asegúrate de que la ruta es correcta
import { PanelLayout } from '@/layouts';
import { useErrorHandler } from '@/hooks';
import { ButtonComponent, DragDropComponent, ErrorComponent, InputComponent, SuccessComponent } from '@/components';

export const UploadPage = () => {
  const navigate = useNavigate();
  const { error: uploadError, handleError: handleUploadError } = useErrorHandler();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState('0');
  const [cover, setCover] = useState<File | null>(null);
  const [coverSize, setCoverSize] = useState('0');

  const handleRemoveFile = (isCover: boolean) => {
    if (isCover) setCover(null);
    else setFile(null);
  };

  const handleFileChange = (event: any, isCover: boolean) => {
    const file = event.target.files[0];
    const fileSizeConverted: string = (file.size / 1000000).toFixed(2);

    if (file && !isCover) {
      setFile(file);
      setFileSize(fileSizeConverted);
    }

    if (file && isCover) {
      setCover(file);
      setCoverSize(fileSizeConverted);
    }
  };

  const handleDrop = (event: any, isCover: boolean) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && !isCover) setFile(file);

    if (file && isCover) setCover(file);
  };

  const handleUploadBook = async (e: any) => {
    e.preventDefault();
    handleUploadError('');
    setSuccessMessage('');

    console.log('uploading', title, description, author, file, cover);

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('cover', cover!);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ' - ' + pair[1]);
    }

    try {
      await uploadNewBook(formData);
      setSuccessMessage('Book uploaded successfully');
      setTitle('');
      setDescription('');
      setAuthor('');
      setFile(null);
      setCover(null);
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
            <InputComponent value={title} onChangeFunc={(e: any) => setTitle(e.target.value)} id='title' type='text' placeholder='Title' />
          </div>

          {/* Author */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Author</label>
          </div>
          <div className='sm:col-span-9'>
            <InputComponent value={author} onChangeFunc={(e: any) => setAuthor(e.target.value)} id='author' type='text' placeholder='Author' />
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
              className='block w-full px-3 py-2 text-sm rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:focus:ring-slate-600'
              rows={3}
              placeholder='Write about the book...'
            />
          </div>

          {/* Image File */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Cover Image</label>
          </div>

          <div className='sm:col-span-9'>
            <DragDropComponent acceptFile='.png, .jpg' isCover={true} file={cover} fileSize={coverSize} fileRestriction='PNG & JPG' handleFileChange={handleFileChange} handleRemoveFile={handleRemoveFile} handleDrop={handleDrop} />
          </div>

          {/* Book File */}
          <div className='sm:col-span-3'>
            <label className='inline-block text-sm text-slate-800 mt-2.5 dark:text-slate-200'>Book File</label>
            <span className='px-1 text-red-500'>*</span>
          </div>

          <div className='sm:col-span-9'>
            <DragDropComponent acceptFile='.pdf' isCover={false} file={file} fileSize={fileSize} fileRestriction='PDF' handleFileChange={handleFileChange} handleRemoveFile={handleRemoveFile} handleDrop={handleDrop} />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end mt-6 gap-x-2'>
          <ButtonComponent type='submit' label='Upload Book' />
        </div>

        {/* Error */}
        {uploadError && <ErrorComponent body={uploadError} />}

        {/* Success */}
        {successMessage.length > 0 && <SuccessComponent body={successMessage} />}
      </form>
    </PanelLayout>
  );
};
