import { ContractDeclaration } from "../declarations";
import { Schema } from '../schema';

export const findContractInSchema = (
  contractName: string,
  schema: Schema,
): ContractDeclaration => {
  const contract = schema.contracts.find(contract => contract.name === contractName);
  if (!contract) {
    throw new Error(`Contract ${contractName} is not exists!`);
  }

  return contract;
};
