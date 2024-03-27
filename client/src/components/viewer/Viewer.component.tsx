import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { useState } from 'react';
import { TbBook, TbDownload, TbMinus, TbPlus, TbHome, TbColumns2, TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { ErrorComponent, ToggleThemeComponent } from '@/components';
import { useErrorHandler } from '@/hooks';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

interface ViewerComponentProps {
  bookUrl: string;
  bookTitle: string;
  bookAuthor: string;
}

export const ViewerComponent = ({ bookUrl, bookTitle, bookAuthor }: ViewerComponentProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [columnTwo, setColumnTwo] = useState<boolean>(false);
  const { error: viewError, handleError: handleViewError } = useErrorHandler();

  const twClassLayout = 'w-8 h-8 px-1 cursor-pointer rounded-md bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors ease-linear dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700';

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);
  const onDocumentLoadError = () => handleViewError('An error ocurred loading PDF.');

  const handleScaleIn = () => setScale(scale + 0.1);
  const handleScaleOut = () => setScale(scale < 0.6 ? 0.6 : scale - 0.1);

  const handleCurrentPage = (value: string) => {
    const page = parseInt(value, 10);
    if (!isNaN(page) && page >= 1 && page <= numPages) {
      setPageNumber(page);
    } else {
      handleViewError('Invalid page number');
    }
  };

  const handleColumnTwo = () => setColumnTwo((prevColumnTwo) => !prevColumnTwo);

  const goToPrevPage = () => setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 2, 1));
  const goToNextPage = () => setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 2, numPages));

  return (
    <div className='min-w-full min-h-screen bg-slate-100 dark:bg-slate-900'>
      <nav className='fixed top-0 z-20 flex flex-row items-center w-full h-16 px-10 py-4 text-sm bg-white border-b justify-evenly dark:bg-slate-800 border-slate-300 dark:border-slate-700'>
        {/* ==> Book info */}
        <div className='inline-flex items-center justify-center h-full max-w-sm gap-2 '>
          <div className='flex items-center justify-center h-full px-2 rounded-md bg-indigo-500/20'>
            <TbBook className='text-indigo-700 dark:text-indigo-500' size={20} />
          </div>
          <div className='flex flex-col w-56 gap-1 pl-4 ml-2 overflow-hidden border-l border-slate-300 dark:border-slate-700'>
            <span className='text-sm font-medium truncate text-slate-800 dark:text-slate-200'>{bookTitle}</span>
            <span className='text-xs truncate text-slate-600 dark:text-slate-400'>{bookAuthor ? bookAuthor : 'No Author'}</span>
          </div>
        </div>
        {/* ==> Book Controllers */}
        <div className='flex flex-row h-full gap-6'>
          {/* Current page */}
          <div className='flex items-center h-full gap-3 select-none text-slate-700 dark:text-slate-400'>
            <TbArrowLeft onClick={goToPrevPage} size={20} className='cursor-pointer' />
            <div className='flex items-center justify-center gap-2 text-base dark:text-slate-200'>
              <input id='page' className='w-16 h-6 text-sm text-center rounded-sm border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 focus:ring focus:ring-indigo-200' type='text' value={pageNumber} onChange={(e: any) => handleCurrentPage(e.target.value)} pattern='\d*' />
              <span className='text-slate-500 dark:text-slate-400'> / {numPages}</span>
            </div>
            <TbArrowRight onClick={goToNextPage} size={20} className='mr-6 cursor-pointer' />
          </div>
          {/* Zoom */}
          <div className='flex items-center h-full gap-2 pr-6 text-base select-none'>
            <TbPlus size={20} onClick={handleScaleIn} className='cursor-pointer text-slate-800 hover:text-indigo-600 dark:text-slate-400' />
            <span className='px-2 text-slate-600 dark:text-slate-300'>{Math.floor(scale * 100)}%</span>
            <TbMinus size={20} onClick={handleScaleOut} className='cursor-pointer text-slate-800 hover:text-indigo-600 dark:text-slate-400' />
          </div>
        </div>
        {/* ==> Book advanced features */}
        <div className='inline-flex gap-2'>
          {/* Download */}
          <NavLink to={'/books'} className={`flex items-center justify-center ${twClassLayout}`}>
            <TbHome size={20} />
          </NavLink>
          <TbColumns2 size={20} className={twClassLayout} type='button' onClick={handleColumnTwo} />
          <TbDownload size={20} className={twClassLayout} />
          <ToggleThemeComponent className={twClassLayout} />
        </div>
      </nav>
      {/* Document */}
      <Document className='inline-flex items-center justify-center w-full h-full mt-20' file={bookUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
        <Page width={800} className={`${columnTwo ? 'border border-r-0 rounded-l-xl' : 'border rounded-xl'}  'z-10 overflow-hidden shadow-lg border-slate-300 dark:border-slate-700`} pageNumber={pageNumber} scale={scale} />
        {columnTwo && pageNumber + 1 <= numPages && <Page width={800} className='overflow-hidden border shadow-lg border-slate-300 rounded-r-xl dark:border-slate-700' pageNumber={pageNumber + 1} scale={scale} />}
      </Document>
      {/* Error */}
      {viewError && <ErrorComponent body={viewError} />}
    </div>
  );
};
