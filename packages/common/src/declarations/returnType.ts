export class ReturnTypeDeclaration {
  public type: string;
  public isArray: boolean;
  public arrayDepth: number;

  public constructor(
    type: string,
    isArray: boolean,
    arrayDepth: number,
  ) {
    this.type = type;
    this.isArray = isArray;
    this.arrayDepth = arrayDepth;
  }
}
