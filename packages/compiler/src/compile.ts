import { Schema, CompileType } from "@koda-rpc/common";
import { validateParams } from "./validation";

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
  await validateParams(
    parameters,
    schema,
    callMethod,
  );
};
