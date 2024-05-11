import * as fs from 'fs-extra';
import { Schema } from '@koda-rpc/common';
import { parseSchema } from '@koda-rpc/parser';
import { normalizePath } from './normailzePath';
import { withExtension } from './withExtension';

export const readSchema = (schemaPath: string): [Schema, string] => {
  const schemaContent = fs.readFileSync(normalizePath(withExtension(schemaPath, '.kodarpc')), 'utf-8');
  return [parseSchema(schemaContent), schemaContent];
}
