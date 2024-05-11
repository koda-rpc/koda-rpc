import { OperationBytes } from "@koda-rpc/common";

export const objectSerializer = (obj: object): Buffer => {
  let buffer = Buffer.alloc(0);

  // Байт, что тут объект
  buffer = Buffer.concat([buffer, Buffer.from([OperationBytes.START_OBJECT])])

  Object.entries(obj).forEach(([key, value]) => {
    console.log([key, value]);
    buffer = Buffer.concat([buffer, Buffer.from([OperationBytes.START_KEY]), Buffer.from(key)]);
    if (typeof value !== 'object') {
      if (typeof value === 'string') {
        buffer = Buffer.concat([buffer, Buffer.from([OperationBytes.START_VALUE]), Buffer.from(value)]);
      } else {
        buffer = Buffer.concat([buffer, Buffer.from([OperationBytes.START_VALUE]), Buffer.from([value])]);
      }
    } else {
      buffer = Buffer.concat([buffer, objectSerializer(value)]);
    }
  })

  return buffer;
}
