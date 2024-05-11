import { parseSchema } from '@koda-rpc/parser';
import * as fs from 'fs-extra';
import { codegen } from './codegen';
import { withExtension, normalizePath } from '../utils';

interface IOptions {
  output: string;
}

export const genTypesAction = (
  schemaPath: string,
  options: IOptions,
) => {
  const schemaContent = fs.readFileSync(normalizePath(withExtension(schemaPath, '.kodarpc')), 'utf-8');
  const parsedSchema = parseSchema(schemaContent);

  const tsSchema = codegen(parsedSchema);
  
  if (!options.output) {
    console.log(tsSchema);
    return;
  }

  const filePath = normalizePath(withExtension(options.output, '.ts'))
  fs.writeFileSync(filePath, tsSchema);
};  
