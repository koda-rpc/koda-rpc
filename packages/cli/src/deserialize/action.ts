import { readSchema } from "../utils"
import { readBinary } from "./readBinary";
import { MessageType, getMessageType } from "@koda-rpc/common";
import { deserialize } from "@koda-rpc/compiler";

interface IOptions {
  input: string;
  type: string;
}

export const deserializeAction = (
  schemaPath,
  options: IOptions
) => {
  const [schema] = readSchema(schemaPath);
  const buffer = readBinary(options.input);
  const messageType = getMessageType(options.type);
  if (messageType === '') {
    throw new Error(`${options.type} is invalid message type`);
  }

  deserialize({
    buffer,
    messageType: messageType as MessageType,
    schema,
  }).then((res) => console.log(JSON.stringify(res, null, 2)));
}
