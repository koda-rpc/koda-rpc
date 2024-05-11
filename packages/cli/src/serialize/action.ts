import {
  compile,
  validateParams,
  getCompileType,
} from "@koda-rpc/compiler";
import { readSchema } from "../utils";
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
  });
};
