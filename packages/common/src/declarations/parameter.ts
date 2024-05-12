import { BasicTypes } from "../types";

export class ParameterDeclaration {
  public name: string;
  public type: BasicTypes | string;
  public required: boolean;
  public isArray: boolean;
  public arrayDepth: number;

  public constructor(
    name: string,
    type: BasicTypes | string,
    required: boolean,
    isArray: boolean,
    arrayDepth: number,
  ) {
    this.name = name;
    this.type = type;
    this.required = required;
    this.isArray = isArray;
    this.arrayDepth = arrayDepth;
  }
}
