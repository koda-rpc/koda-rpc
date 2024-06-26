import { Schema, MessageType, MessageTypeBytes, DataTypeBytes, ServiceBytes } from "@koda-rpc/common";
import { match } from "ts-pattern";
import { validateParams } from "./validation";
import { compress } from "./compressor";

export interface ISerializeOptions {
  callMethod: string;
  messageType: MessageType;
  parameters: Array<unknown>;
  schema: Schema;
}

export const serialize = async ({
  callMethod,
  messageType,
  parameters,
  schema,
}: ISerializeOptions) => {
  await validateParams(
    parameters,
    schema,
    callMethod,
  );

  let buffer: Buffer = Buffer.alloc(0);

  // Тип сообщения
  let msgTypeByte = match<MessageType>(messageType)
    .with(MessageType.REQUEST, () => MessageTypeBytes.REQUEST)
    .with(MessageType.RESPONSE, () => MessageTypeBytes.RESPONSE)
    .exhaustive();
  
  buffer = Buffer.concat([buffer, Buffer.from([msgTypeByte])]);

  // Длина метода
  const methodLengthBuffer = Buffer.alloc(1);
  methodLengthBuffer.writeUint8(callMethod.length);
  buffer = Buffer.concat([buffer, methodLengthBuffer]);

  // Вызываемый метод
  buffer = Buffer.concat([buffer, Buffer.from(callMethod)]);

  // Количество параметров
  const paramsCountBuffer = Buffer.alloc(1);
  paramsCountBuffer.writeUint8(parameters.length);
  buffer = Buffer.concat([buffer, paramsCountBuffer]);

  // Параметры
  parameters.forEach(parameter => {
    if (typeof parameter === 'number') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.NUMBER])]);
      const numberValueBuffer = Buffer.alloc(4);
      numberValueBuffer.writeUint32LE(parameter);
      buffer = Buffer.concat([buffer, numberValueBuffer])
    } else if (typeof parameter === 'string') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.STRING])]);
      const stringLengthBuffer = Buffer.alloc(1);
      stringLengthBuffer.writeUInt8(parameter.length);
      buffer = Buffer.concat([buffer, stringLengthBuffer]);
      buffer = Buffer.concat([buffer, Buffer.from(parameter)]);
    } else if (typeof parameter === 'boolean') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.BOOLEAN])]);
      const boolValueBuffer = Buffer.alloc(1);
      boolValueBuffer.writeUInt8(parameter ? 0x01 : 0x00);
      buffer = Buffer.concat([buffer, boolValueBuffer]);
    } else if (typeof parameter === 'object') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.OBJECT])]);
      buffer = Buffer.concat([buffer, serializeObject(parameter)]);
    } else {
      throw new Error(`Unsupported parameter type: ${typeof parameter}`);
    }
  });

  const endByte = Buffer.alloc(1);
  endByte.writeUInt8(ServiceBytes.EOL);
  buffer = Buffer.concat([buffer, endByte]);

  return compress(buffer);
};

const serializeObject = (obj: object): Buffer => {
  let buffer = Buffer.alloc(0);

  const entries = Object.entries(obj);
  entries.forEach(([key, value]) => {
    // Количество ключей
    const keysCountBuffer = Buffer.alloc(1);
    keysCountBuffer.writeUint8(entries.length);
    buffer = Buffer.concat([buffer, keysCountBuffer]);
    // Длина ключа
    const keyLengthBuffer = Buffer.alloc(1);
    keyLengthBuffer.writeUInt8(key.length);
    buffer = Buffer.concat([buffer, keyLengthBuffer]);
    // Ключ
    buffer = Buffer.concat([buffer, Buffer.from(key)]);
    
    if (typeof value === 'number') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.NUMBER])]);
      const numberValueBuffer = Buffer.alloc(4);
      numberValueBuffer.writeInt32LE(value);
      buffer = Buffer.concat([buffer, numberValueBuffer]);
    } else if (typeof value === 'string') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.STRING])]);
      const stringLengthBuffer = Buffer.alloc(1);
      stringLengthBuffer.writeUInt8(value.length);
      buffer = Buffer.concat([buffer, stringLengthBuffer]);
      buffer = Buffer.concat([buffer, Buffer.from(value)]);
    } else if (typeof value === 'boolean') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.BOOLEAN])]);
      const boolValueBuffer = Buffer.alloc(1);
      boolValueBuffer.writeUInt8(value ? 0x01 : 0x00);
      buffer = Buffer.concat([buffer, boolValueBuffer]);
    } else if (typeof value === 'object') {
      buffer = Buffer.concat([buffer, Buffer.from([DataTypeBytes.OBJECT])]);
      buffer = Buffer.concat([buffer, serializeObject(value)]);
    } else {
      throw new Error(`Unsupported value type: ${typeof value}`);
    }
  });

  return buffer;
}

