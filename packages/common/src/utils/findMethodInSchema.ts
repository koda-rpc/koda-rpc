import { MethodDeclaration } from "../declarations";
import { Schema } from '../schema';

export const findMethodInSchema = (
  callMethod: string,
  schema: Schema,
): MethodDeclaration => {
  const [serviceName, methodName] = callMethod.split('.');

  const service = schema.services.find(service => service.name === serviceName);
  if (!service) {
    throw new Error(`Service ${serviceName} is not exists!`);
  }

  const method = service.methods.find(method => method.name === methodName);
  if (!method) {
    throw new Error(`Method ${methodName} is not exists!`);
  }

  return method;
};
