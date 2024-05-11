import { MessageTypeBytes, OperationBytes } from "@koda-rpc/common";
import { objectSerializer } from "./objectSerializer";

interface IRequestSerializerParams {
  callMethod: string;
  parameters: Array<unknown>;
}

export const requestSerializer = async ({
  callMethod,
  parameters,
}: IRequestSerializerParams): Promise<Buffer> => {
  let buffer = Buffer.alloc(0);

  // Установка типа сообщения
  buffer = Buffer.concat([
    buffer,
    Buffer.from([OperationBytes.MESSAGE_TYPE]),
    Buffer.from([MessageTypeBytes.REQUEST])
  ]);

  // Установка вызываемого метода
  buffer = Buffer.concat([
    buffer,
    Buffer.from([OperationBytes.CALL_METHOD]),
    Buffer.from(callMethod),
  ]);

  // Установка параметров
  parameters.forEach((parameter: object) => {
    buffer = Buffer.concat([buffer, Buffer.from([OperationBytes.START_PARAMETER])]);

    if (typeof parameter !== 'object') {
      buffer = Buffer.concat([buffer, Buffer.from([parameter])]);
    } else {
      buffer = Buffer.concat([buffer, objectSerializer(parameter)]); 
    }
  });

  return buffer;
}
