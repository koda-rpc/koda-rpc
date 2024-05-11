import { MessageTypeBytes, OperationBytes } from "@koda-rpc/common";
import { objectSerializer } from "./objectSerializer";

interface IResponseSerializer {
  callMethod: string;
  parameters: Array<unknown>;
}

export const responseSerializer = async ({
  callMethod,
  parameters,
}: IResponseSerializer): Promise<Buffer> => {
  let buffer = Buffer.alloc(0);

  // Установка типа сообщения
  buffer = Buffer.concat([
    buffer,
    Buffer.from([OperationBytes.MESSAGE_TYPE]),
    Buffer.from([MessageTypeBytes.RESPONSE])
  ]);

  // Установка вызываемого метода
  buffer = Buffer.concat([
    buffer,
    Buffer.from([OperationBytes.CALL_METHOD]),
    Buffer.from(callMethod),
  ]);

  // Возвращаемые данные
  const [returnData] = parameters;

  buffer = Buffer.concat([
    buffer,
    Buffer.from([OperationBytes.START_RETURN_DATA])
  ])
  
  if (typeof returnData === 'object') {
    buffer = Buffer.concat([
      buffer,
      objectSerializer(returnData)
    ]);
  } else {
    buffer = Buffer.concat([
      buffer,
      Buffer.from([returnData as any])
    ]);
  }

  return buffer;
}
