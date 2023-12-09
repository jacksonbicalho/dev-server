import fs from 'fs';

export function fileExists(path: fs.PathLike): boolean {
  return fs.existsSync(path);
}

export const writeFile = (
  file: fs.PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView
) => {
  fs.writeFileSync(file, data);
};

type readFileOptions =
  | {
      encoding: BufferEncoding;
      flag?: string | undefined;
    }
  | BufferEncoding;

export const readFile = (
  file: fs.PathOrFileDescriptor,
  options: readFileOptions
) => {
  return fs.readFileSync(file, options);
};
