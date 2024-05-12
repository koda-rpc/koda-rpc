import {
  serialize,
} from "@koda-rpc/compiler";
import * as fs from 'fs-extra';
import { normalizePath, readSchema } from "../utils";
import { normalizeParams } from "./normalizeParams";
import { MessageType, getMessageType } from "@koda-rpc/common";

interface IOptions {
  callMethod: string;
  type: string;
  parameters: string;
  output: string;
}

export const serializeAction = (
  schemaPath,
  options: IOptions,
) => {
  const [schema] = readSchema(schemaPath);
  
  const messageType = getMessageType(options.type);
  if (messageType === '') {
    throw new Error(`${options.type} is invalid compile type`);
  }

  serialize({
    callMethod: options.callMethod,
    messageType: messageType as MessageType,
    parameters: normalizeParams(options.parameters),
    schema,
  }).then(buffer => {
    if (options.output) {
      fs.writeFileSync(
        normalizePath(options.output),
        buffer
      );
    }
  });
};
