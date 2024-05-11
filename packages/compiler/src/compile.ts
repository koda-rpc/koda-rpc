import { Schema } from "@koda-rpc/common";
import { CompileType } from '@koda-rpc/common';
import { ParametersType } from "./types";

export interface ICompileOptions<P extends Function> {
  callSignature: string;
  compileType: CompileType;
  parameters: ParametersType<P>;
  schema: Schema;
}

export const compile = <P extends Function>({
  callSignature,
  compileType,
  parameters,
  schema,
}: ICompileOptions<P>) => {
  const [serviceName, methodName] = callSignature.split('.');

  const service = schema.services.find(service => service.name === serviceName);
  if (!service) {
    throw new Error(`Service ${serviceName} is not exists!`);
  }

  const method = service.methods.find(method => method.name === methodName);
  if (!method) {
    throw new Error(`Method ${methodName} is not exists!`);
  }

};
