import * as path from 'node:path';

export const withExtension = (
  filePath: string,
  extension: string,
): string => {
  if (path.extname(filePath) !== extension) {
    return filePath + extension;
  }

  return filePath;
}
