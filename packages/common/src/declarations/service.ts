import { MethodDeclaration } from "./method";

export class ServiceDeclaration {
  public name: string;
  public methods: Array<MethodDeclaration>;

  public constructor(
    name: string,
    methods: Array<MethodDeclaration>,
  ) {
    this.name = name;
    this.methods = methods;
  }
}
