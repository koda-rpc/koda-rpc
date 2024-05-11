import { ParameterDeclaration } from "./parameter";

export class MethodDeclaration {
  public name: string;
  public returnType: string;
  public parameters: Array<ParameterDeclaration>;

  constructor(
    name: string,
    returnType: string,
    parameters: Array<ParameterDeclaration>,
  ) {
    this.name = name;
    this.returnType = returnType;
    this.parameters = parameters;
  }
}
