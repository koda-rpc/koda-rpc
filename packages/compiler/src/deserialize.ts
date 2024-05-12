import { DataTypeBytes, MessageType, MessageTypeBytes, Schema } from "@koda-rpc/common";
import { validateParams } from "./validation";
import { match } from "ts-pattern";
import { IDeserializedData } from "./types";

interface IDeserializeOptions {
  buffer: Buffer;
  messageType: MessageType;
  schema: Schema;
}

export const deserialize = async ({
  buffer,
  schema,
}: IDeserializeOptions): Promise<IDeserializedData> => {
  // Распаковываем данные с использованием zlib
  const uncompressedBuffer = buffer;

  let index = 0;

  // Читаем тип сообщения
  const msgTypeByte = uncompressedBuffer[index++] as MessageTypeBytes;
  const msgType = match<MessageTypeBytes>(msgTypeByte)
    .with(MessageTypeBytes.REQUEST, () => MessageType.REQUEST)
    .with(MessageTypeBytes.RESPONSE, () => MessageType.RESPONSE)
    .otherwise(() => '');

  // Читаем длину метода
  const methodLength = uncompressedBuffer[index++];
  // Читаем вызываемый метод
  const callMethod = uncompressedBuffer.slice(index, index + methodLength).toString();
  index += methodLength;

  // Читаем количество параметров
  const parametersCount = uncompressedBuffer[index++];
  const parameters: unknown[] = [];

  // Читаем параметры
  for (let i = 0; i < parametersCount; i++) {
    // Читаем тип параметра
    const parameterType = uncompressedBuffer[index++];
    if (parameterType === DataTypeBytes.NUMBER) {
      const numberValue = uncompressedBuffer.readInt32LE(index);
      parameters.push(numberValue);
      index += 4;
    } else if (parameterType === DataTypeBytes.STRING) {
      const stringLength = uncompressedBuffer[index++];
      const stringValue = uncompressedBuffer.slice(index, index + stringLength).toString();
      parameters.push(stringValue);
      index += stringLength;
    } else if (parameterType === DataTypeBytes.BOOLEAN) {
      const booleanValue = uncompressedBuffer[index++] === 0x01;
      parameters.push(booleanValue);
    } else if (parameterType === DataTypeBytes.OBJECT) {
      const { parsedObject, newIndex } = deserializeObject(uncompressedBuffer.slice(index));
      parameters.push(parsedObject);
      index += newIndex;
    } else {
      throw new Error(`Unsupported parameter type: ${parameterType}`);
    }
  }

  // Проверяем наличие завершающего байта
  const endByte = uncompressedBuffer[index];
  if (endByte !== 0xFF) {
    throw new Error('Invalid end byte');
  }

  await validateParams(
    parameters,
    schema,
    callMethod,
  );

  return {
    messageType: msgType as MessageType,
    callMethod,
    parameters,
  };
}

const deserializeObject = (buffer: Buffer): { parsedObject: object; newIndex: number } => {
  let index = 0;
  const parsedObject: { [key: string]: any } = {};

  // Читаем количество ключей
  const keysCount = buffer[index++];
  for (let keyNum = 0; keyNum < keysCount; keyNum++, index++){
    // Читаем длину ключа
    const keyLength = buffer[index++];
    // Читаем ключ
    const key = buffer.slice(index, index + keyLength).toString();
    index += keyLength;

    // Читаем тип значения
    const valueType = buffer[index++];
    if (valueType === DataTypeBytes.NUMBER) {
      const numberValue = buffer.readInt32LE(index);
      parsedObject[key] = numberValue;
      index += 4;
    } else if (valueType === DataTypeBytes.STRING) {
      const stringLength = buffer[index++];
      const stringValue = buffer.slice(index, index + stringLength).toString();
      parsedObject[key] = stringValue;
      index += stringLength;
    } else if (valueType === DataTypeBytes.BOOLEAN) {
      const booleanValue = buffer[index++] === 0x01;
      parsedObject[key] = booleanValue;
    } else if (valueType === DataTypeBytes.OBJECT) {
      const { parsedObject: nestedObject, newIndex } = deserializeObject(buffer.slice(index));
      parsedObject[key] = nestedObject;
      index += newIndex;
    } else {
      throw new Error(`Unsupported value type: ${valueType}`);
    }
  }

  return { parsedObject, newIndex: index - 1 };
}
