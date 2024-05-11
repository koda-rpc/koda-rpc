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
  CALL_SIGNTURE = 0x1b,
}

export enum MessageTypeBytes {
  REQUEST = 0x11,
  RESPONSE = 0x12
}
