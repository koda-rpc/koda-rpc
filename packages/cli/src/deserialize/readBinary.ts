import * as fs from 'fs-extra';
import { normalizePath } from '../utils';

export const readBinary = (input: string) => {
  return fs.readFileSync(normalizePath(input));
}
