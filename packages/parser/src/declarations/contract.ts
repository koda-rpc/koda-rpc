import { FieldDeclaration } from "./field";

export class ContractDeclaration {
  public name: string;
  public fields: Array<FieldDeclaration>;

  public constructor(
    name: string,
    fields: Array<FieldDeclaration>
  ) {
    this.name = name;
    this.fields = fields;
  }
}
