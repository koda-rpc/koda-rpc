import {
  compile,
  validateParams,
  getCompileType,
} from "@koda-rpc/compiler";
import { readSchema } from "../utils";
import { normalizeParams } from "./normalizeParams";

interface IOptions {
  callSignature: string;
  type: string;
  parameters: string;
  output: string;
}

export const compileAction = (
  schemaPath,
  options: IOptions,
) => {
  const [schema] = readSchema(schemaPath);
  
  const compileType = getCompileType(options.type);
  if (compileType === '') {
    throw new Error(`${options.type} is invalid compile type`);
  }

  console.log(JSON.stringify(schema));

  validateParams(
    normalizeParams(options.parameters),
    schema,
    options.callSignature,
  );

  // const parameters = validateParams(options.parameters, schema);

  // compile({
  //   callSignature: options.callSignature,
  //   compileType: compileType as CompileType,
  //   parameters: options.parameters,
  //   schema,
  // });
};
