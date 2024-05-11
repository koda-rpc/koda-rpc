import { BasicTypes } from "../types";

export class ParameterDeclaration {
  public name: string;
  public type: BasicTypes | string;

  public constructor(
    name: string,
    type: BasicTypes | string
  ) {
    this.name = name;
    this.type = type;
  }
}
