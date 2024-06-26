export class FieldDeclaration {
  public name: string;
  public type: string;
  public required: boolean;
  public isArray: boolean;
  public arrayDepth: number;

  public constructor(
    name: string,
    type: string,
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
