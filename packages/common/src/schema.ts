import { ContractDeclaration, ServiceDeclaration } from "./declarations";

export class Schema {
  public services: Array<ServiceDeclaration>;
  public contracts: Array<ContractDeclaration>;

  public constructor(
    services: Array<ServiceDeclaration>,
    contracts: Array<ContractDeclaration>,
  ) {
    this.services = services;
    this.contracts = contracts;
  }
}
