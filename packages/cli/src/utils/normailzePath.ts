import * as path from 'node:path';

export const normalizePath = (filePath: string): string =>
  path.resolve(process.cwd(), filePath);
