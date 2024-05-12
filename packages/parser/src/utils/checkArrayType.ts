export const checkArrayType = (typeString: string): [boolean, number] => {
  const isArray = typeString.includes('[]');
  const depth = (typeString.match(/\[\]/g) || []).length;

  return [isArray, depth];
};
