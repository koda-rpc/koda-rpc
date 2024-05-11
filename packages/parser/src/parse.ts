import {
  ContractDeclaration,
  FieldDeclaration,
  MethodDeclaration,
  ParameterDeclaration,
  ServiceDeclaration,
  Schema,
} from "@koda-rpc/common";
import {
  contractRegex,
  fieldRegex,
  methodRegex,
  parameterRegex,
  serviceRegex,
} from "./regex";

export const parseSchema = (schema: string): Schema => {
  const services: ServiceDeclaration[] = [];
  const contracts: ContractDeclaration[] = [];

  let match;
  while ((match = serviceRegex.exec(schema)) !== null) {
    const serviceName = match[1];
    const methods: MethodDeclaration[] = [];

    let methodMatch;
    const methodsStr = match[2];
    while ((methodMatch = methodRegex.exec(methodsStr)) !== null) {
      const methodName = methodMatch[1];
      const returnType = methodMatch[3];
      const parameters: ParameterDeclaration[] = [];

      let parameterMatch;
      const parametersStr = methodMatch[2];
      while ((parameterMatch = parameterRegex.exec(parametersStr)) !== null) {
        let paramName = parameterMatch[1];
        let paramType = parameterMatch[2];

        const required = !paramName.includes('?');
        paramName = paramName.replaceAll('?', '');

        parameters.push(new ParameterDeclaration(paramName, paramType, required));
      }

      methods.push(new MethodDeclaration(methodName, returnType, parameters));
    }

    services.push(new ServiceDeclaration(serviceName, methods));
  }

  // @todo срочно оптимизировать!!!!!
  while ((match = contractRegex.exec(schema)) !== null) {
    const contractName = match[1];

    const fieldsStr = match[2];
    const fields = fieldsStr
      .split('\n')
      .reduce((acc, item) => {
        if (item === '') return acc;

        let [type, name] = item.trim().replaceAll(';', '').split(' ').filter(symbol => symbol !== ' ');

        const required = !name.includes('?');
        name = name.replaceAll('?', '');

        acc.push(
          new FieldDeclaration(name, type, required),
        );

        return acc;
      }, []);

    contracts.push(new ContractDeclaration(contractName, fields));
  }

  const serviceNames = services.map(service => service.name);
  const contractNames = contracts.map(contract => contract.name);

  const filteredNames = serviceNames.filter(name => contractNames.includes(name));

  if (filteredNames.length !== 0) {
    throw new Error(`${filteredNames.join(', ')}is duplicates!`)
  }

  return new Schema(services, contracts);
};
