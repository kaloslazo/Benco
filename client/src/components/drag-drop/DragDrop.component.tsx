import { BsFilePdfFill } from 'react-icons/bs';
import { TbX, TbUpload, TbPng } from 'react-icons/tb';

interface DragDropComponentPropsInterface {
  file: File | null;
  fileSize: string;
  fileRestriction: string;
  handleRemoveFile: (isCover: boolean) => void;
  handleFileChange: (event: any, isCover: boolean) => void;
  handleDrop: (event: any, isCover: boolean) => void;
  isCover: boolean;
  acceptFile: string;
}

export const DragDropComponent = ({ file, fileSize, fileRestriction, handleFileChange, handleRemoveFile, handleDrop, isCover, acceptFile }: DragDropComponentPropsInterface) => {
  return file ? (
    <div className='inline-flex p-2.5 items-start justify-between w-full gap-2 border-2 rounded-lg border-slate-200 group dark:border-slate-700 hover:border-indigo-600'>
      <div className='inline-flex gap-4 overflow-hidden break-words'>
        <div className='flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-md'>{isCover ? <TbPng className='p-2 text-white size-10 dark:text-slate-200' size={20} /> : <BsFilePdfFill className='p-2 text-white size-10 dark:text-slate-200' size={20} />}</div>
        <span className='inline-flex gap-2 text-sm text-slate-700 dark:text-slate-200'>
          <div className='flex flex-col items-start gap-2'>
            <p className='font-normal text-slate-700 text-md'>{file?.name}</p>
            <p className='text-xs text-slate-500'>{fileSize} Mb</p>
          </div>
        </span>
      </div>
      <button onClick={() => handleRemoveFile(isCover)} className='text-red-500'>
        <TbX size={24} />
      </button>
    </div>
  ) : (
    <label htmlFor='af-submit-app-upload-images' className='block p-4 text-center border-2 border-dashed rounded-lg cursor-pointer border-slate-300 group sm:p-7 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 dark:border-slate-700' onDragOver={(e) => e.preventDefault()} onDrop={(e: any) => handleDrop(e, isCover)}>
      <input id='af-submit-app-upload-images' name='af-submit-app-upload-images' type='file' className='sr-only' onChange={(e: any) => handleFileChange(e, isCover)} accept={acceptFile} />
      <TbUpload className='mx-auto text-slate-300 size-10 dark:text-slate-700' size={20} />
      <span className='block mt-2 text-sm text-slate-800 dark:text-slate-200'>
        Browse your device or <span className='text-indigo-600 group-hover:text-indigo-700'>drag & drop your file</span>
      </span>
      <span className='block mt-1 text-xs text-slate-500 '>Only {fileRestriction} files are allowed</span>
    </label>
  );
};
