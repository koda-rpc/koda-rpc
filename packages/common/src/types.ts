export enum CompileType {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum BasicTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  VOID = 'void',
}

export enum OperationBytes {
  MESSAGE_TYPE = 0x01,
  CALL_METHOD = 0x1b,
  START_PARAMETER = 0x2a,
  START_RETURN_DATA = 0x2b,
  START_OBJECT = 0x3,
  START_KEY = 0x3a,
  START_VALUE = 0x3b
}

export enum MessageTypeBytes {
  REQUEST = 0x11,
  RESPONSE = 0x12
}
