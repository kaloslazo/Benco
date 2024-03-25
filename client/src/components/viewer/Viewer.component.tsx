import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { useState } from 'react';
import { TbBook, TbDownload, TbMinus, TbPlus, TbHome, TbColumns2, TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);

  const handleScaleIn = () => setScale(scale + 0.1);
  const handleScaleOut = () => setScale(scale < 0.6 ? 0.6 : scale - 0.1);

  const handleColumnTwo = () => setColumnTwo((prevColumnTwo) => !prevColumnTwo);

  const goToPrevPage = () => setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 2, 1));
  const goToNextPage = () => setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 2, numPages));

  return (
    <div className='min-w-full min-h-screen viewer-container bg-slate-100 dark:bg-slate-900'>
      <nav className='flex flex-row items-center justify-around w-full h-16 px-10 py-4 text-sm bg-white shadow-md dark:bg-slate-800'>
        {/* ==> Book info */}
        <div className='inline-flex items-center justify-center h-full gap-2'>
          <div className='flex items-center justify-center h-full px-2 rounded-md bg-teal-500/20'>
            <TbBook className='text-teal-700 dark:text-teal-500' size={20} />
          </div>
          <div className='flex flex-col gap-1 pl-4 ml-2 border-l border-slate-300 w-34'>
            <span className='text-sm font-medium truncate text-slate-800 dark:text-slate-200'>{bookTitle}</span>
            <span className='text-xs truncate text-slate-600 dark:text-slate-400'>{bookAuthor}</span>
          </div>
        </div>
        {/* ==> Book Controllers */}
        <div className='flex flex-row h-full gap-6'>
          {/* Current page */}
          <div className='flex items-center h-full gap-3 select-none text-slate-700 dark:text-slate-400'>
            <TbArrowLeft onClick={goToPrevPage} size={20} className='cursor-pointer' />
            <div className='text-base dark:text-slate-200'>
              {pageNumber}
              <span className='text-slate-500 dark:text-slate-400'> / {numPages}</span>
            </div>
            <TbArrowRight onClick={goToNextPage} size={20} className='mr-6 cursor-pointer' />
          </div>
          {/* Zoom */}
          <div className='flex items-center h-full gap-2 pr-6 text-base select-none'>
            <TbPlus size={20} onClick={handleScaleIn} className='cursor-pointer text-slate-800 hover:text-teal-600 dark:text-slate-400' />
            <span className='px-2 text-slate-600 dark:text-slate-300'>{Math.floor(scale * 100)}%</span>
            <TbMinus size={20} onClick={handleScaleOut} className='cursor-pointer text-slate-800 hover:text-teal-600 dark:text-slate-400' />
          </div>
        </div>
        {/* ==> Book advanced features */}
        <div className='inline-flex gap-2'>
          {/* Download */}
          <NavLink to={'/books'} className='cursor-pointer text-slate-800 dark:text-slate-400 hover:text-teal-600'>
            <TbHome size={20} />
          </NavLink>
          <TbColumns2 size={20} className='cursor-pointer text-slate-800 dark:text-slate-400 hover:text-teal-600' type='button' onClick={handleColumnTwo} />
          <TbDownload size={20} className='cursor-pointer text-slate-800 dark:text-slate-400 hover:text-teal-600' />
        </div>
      </nav>
      <Document className='inline-flex items-center justify-center w-full py-4 ' file={bookUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Render the current page */}
        <Page width={500} className={`${columnTwo ? 'border border-r-0 rounded-l-xl' : 'border rounded-xl'}  'z-10 overflow-hidden shadow-lg border-slate-200`} pageNumber={pageNumber} scale={scale} />
        {/* Render the next page if it exists */}
        {columnTwo && pageNumber + 1 <= numPages && <Page width={500} className='overflow-hidden border shadow-lg border-slate-200 rounded-r-xl' pageNumber={pageNumber + 1} scale={scale} />}
      </Document>
    </div>
  );
};
