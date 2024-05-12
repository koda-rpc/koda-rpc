export const serviceRegex = /svc\s+(\w+)\s*{([^}]+)}/g;
export const methodRegex = /(\w+)\(([^)]*)\)\s*:\s*(\w+(?:\[\])?)/g;
export const parameterRegex = /(\w+\??)\s*:\s*(\w+(?:\[\])?)/g;
export const contractRegex = /contract\s+(\w+)\s*{([^}]+)}/g;
export const fieldRegex = /\b(\w+)\b\s*:\s*((?:\w+\[\])?(?:[^\s;]+(?:\s*<[^>]+>)?))\s*;/g;

