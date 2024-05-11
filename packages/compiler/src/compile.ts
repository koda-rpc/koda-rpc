import { Schema, CompileType } from "@koda-rpc/common";
import { validateParams, validateReturnData } from "./validation";
import { requestSerializer } from "./serializers";
import { responseSerializer } from "./serializers/responseSerializer";

export interface ICompileOptions {
  callMethod: string;
  compileType: CompileType;
  parameters: Array<unknown>;
  schema: Schema;
}

export const compile = async ({
  callMethod,
  compileType,
  parameters,
  schema,
}: ICompileOptions) => {
  let buffer: Buffer;

  if (compileType === CompileType.REQUEST) {
    await validateParams(
      parameters,
      schema,
      callMethod,
    );

    buffer = await requestSerializer({
      callMethod,
      parameters,
    });
  }

  if (compileType === CompileType.RESPONSE) {
    const [returnData] = parameters;
    
    await validateReturnData(
      returnData,
      schema,
      callMethod,
    );

    buffer = await responseSerializer({
      callMethod,
      parameters,
    });
  }

  return buffer;
};
