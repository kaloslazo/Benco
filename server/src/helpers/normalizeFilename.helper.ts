export const normalizeFilename = (filename: string, checkIfDatabase = false): string => {
  return filename.replace(/\s/g, '-').toLowerCase();
};
