export class FieldDeclaration {
  public name: string;
  public type: string;
  public required: boolean;

  public constructor(
    name: string,
    type: string,
    required: boolean,
  ) {
    this.name = name;
    this.type = type;
    this.required = required;
  }
}
