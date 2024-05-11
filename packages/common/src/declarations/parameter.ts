import { BasicTypes } from "../types";

export class ParameterDeclaration {
  public name: string;
  public type: BasicTypes | string;
  public required: boolean;

  public constructor(
    name: string,
    type: BasicTypes | string,
    required: boolean,
  ) {
    this.name = name;
    this.type = type;
    this.required = required;
  }
}
