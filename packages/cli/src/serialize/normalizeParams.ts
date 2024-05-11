export const normalizeParams = (paramsString: string): Array<unknown> => {
  return JSON.parse(`[${paramsString}]`);
};
