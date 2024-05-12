import { MessageType } from "@koda-rpc/common";

export type ParametersType<F extends Function> =
  F extends (...args: infer A) => any ? A : never;

export interface IDeserializedData {
  messageType: MessageType;
  callMethod: string;
  parameters: Array<unknown>;
}
