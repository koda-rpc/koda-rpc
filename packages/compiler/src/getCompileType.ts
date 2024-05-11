import { CompileType } from "@koda-rpc/common";
import { match } from "ts-pattern";

export const getCompileType = (type: string) => match(type)
  .with('request', () => CompileType.REQUEST)
  .with('response', () => CompileType.RESPONSE)
  .otherwise(() => '');
