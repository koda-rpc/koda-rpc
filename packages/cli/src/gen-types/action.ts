import * as fs from 'fs-extra';
import { codegen } from './codegen';
import { withExtension, normalizePath, readSchema } from '../utils';

interface IOptions {
  output: string;
}

export const genTypesAction = (
  schemaPath: string,
  options: IOptions,
) => {
  const [schema, fileContent] = readSchema(schemaPath);

  const tsSchema = codegen(schema, fileContent);
  
  if (!options.output) {
    console.log(tsSchema);
    return;
  }

  const filePath = normalizePath(withExtension(options.output, '.ts'))
  fs.writeFileSync(filePath, tsSchema);
};  
