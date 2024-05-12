import * as zlib from 'node:zlib';

export const compress = (buffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.deflate(buffer, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
};

export const decompress = (buffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.inflate(buffer, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    })
  });
};
