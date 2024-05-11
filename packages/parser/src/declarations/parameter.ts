export class ParameterDeclaration {
  public name: string;
  public type: string;

  public constructor(
    name: string,
    type: string
  ) {
    this.name = name;
    this.type = type;
  }
}
