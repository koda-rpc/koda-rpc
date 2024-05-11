import {
  compile,
  getCompileType,
} from "@koda-rpc/compiler";
import * as fs from 'fs-extra';
import { normalizePath, readSchema, withExtension } from "../utils";
import { normalizeParams } from "./normalizeParams";
import { CompileType } from "@koda-rpc/common";

interface IOptions {
  callMethod: string;
  type: string;
  parameters: string;
  output: string;
}

export const serializeAction = (
  schemaPath,
  options: IOptions,
) => {
  const [schema] = readSchema(schemaPath);
  
  const compileType = getCompileType(options.type);
  if (compileType === '') {
    throw new Error(`${options.type} is invalid compile type`);
  }

  compile({
    callMethod: options.callMethod,
    compileType: compileType as CompileType,
    parameters: normalizeParams(options.parameters),
    schema,
  }).then(buffer => {
    const json = {
      type: 'request',
      callMethod: options.callMethod,
      parameters: normalizeParams(options.parameters),
    }
    const jsonBuffer = Buffer.from(JSON.stringify(json));
    
    console.log(`JSON ${Buffer.byteLength(jsonBuffer)} bytes`);
    console.log(jsonBuffer, '\n');
    console.log(`Buffer ${Buffer.byteLength(buffer)} bytes`);
    console.log(buffer, '\n');

    if (options.output) {
      fs.writeFileSync(
        normalizePath(options.output),
        buffer
      );
    }
  });
};
