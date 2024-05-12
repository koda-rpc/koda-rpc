import { MessageType } from "../types";
import { match } from "ts-pattern";

export const getMessageType = (type: string) => match(type)
  .with('request', () => MessageType.REQUEST)
  .with('response', () => MessageType.RESPONSE)
  .otherwise(() => '');
