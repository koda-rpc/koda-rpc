export enum MessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum BasicTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  VOID = 'void',
}

export enum MessageTypeBytes {
  REQUEST = 0x01,
  RESPONSE = 0x02,
}

export enum DataTypeBytes {
  NUMBER = 0x01,
  STRING = 0x02,
  BOOLEAN = 0x03,
  OBJECT = 0x04,
}

export enum ServiceBytes {
  EOL = 0xFF,
}
