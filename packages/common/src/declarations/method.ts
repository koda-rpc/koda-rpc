import { ParameterDeclaration } from "./parameter";
import { ReturnTypeDeclaration } from "./returnType";

export class MethodDeclaration {
  public name: string;
  public returnType: ReturnTypeDeclaration;
  public parameters: Array<ParameterDeclaration>;

  constructor(
    name: string,
    returnType: ReturnTypeDeclaration,
    parameters: Array<ParameterDeclaration>,
  ) {
    this.name = name;
    this.returnType = returnType;
    this.parameters = parameters;
  }
}
