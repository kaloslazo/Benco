import { existsSync } from 'fs';
import { basename, dirname, extname } from 'path';

export const uniquePath = (filepath: string): string => {
  let uniquePath = filepath;
  let counterAddition = 0;

  const fileExtension = extname(filepath); // get extension type of the file
  const fileBasename = basename(filepath, fileExtension); // get the name of the file without the extension

  while (existsSync(uniquePath)) {
    uniquePath = `${dirname(filepath)}/${fileBasename}_${counterAddition}${fileExtension}`;
    counterAddition++;
  }

  return uniquePath;
};
