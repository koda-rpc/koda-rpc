import { Schema, findContractInSchema } from "@koda-rpc/common";
import { findMethodInSchema } from "@koda-rpc/common";

export const validateParams = (
  params: Array<unknown>,
  schema: Schema,
  callSignature: string
) => {
  const method = findMethodInSchema(callSignature, schema);

  params.forEach((param, index) => {
    const methodParam = method.parameters[index];

    if (typeof param === 'object') {
      validateContract(
        param,
        methodParam.type,
        schema
      );
      return;
    }
    
    if (typeof param !== methodParam.type) {
      throw new TypeError(`${param} expects type ${methodParam.type}, but returns ${typeof param}`)
    }
  });
};

export const validateContract = (
  param: object,
  contractName: string,
  schema: Schema,
) => {
  const contract = findContractInSchema(contractName, schema);

  let requiredFields = contract.fields.reduce((acc, item) => {
    if (item.required) {
      acc.push(item.name);
    }
    return acc;
  }, []);

  Object.entries(param).forEach(([key, value]) => {
    const field = contract.fields.find(field => field.name === key);
    if (!field) {
      throw new TypeError(`Field ${key} is not exists in ${contract.name} contract!`);
    }

    if (typeof value === 'object') {
      validateContract(
        value,
        field.type,
        schema,
      );

      requiredFields = requiredFields.filter(field => field !== key);
      return;
    }

    if (typeof value !== field.type) {
      throw new TypeError(`${key} expects type ${field.type}, but returns ${typeof value}`)
    }

    requiredFields = requiredFields.filter(field => field !== key);
  });

  if (requiredFields.length !== 0) {
    throw new TypeError(`${contract.name}: ${requiredFields.join(', ')} fields are required!`)
  }
};
