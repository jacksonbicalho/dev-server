import fs from 'fs';

type readFileOptions =
  | {
      encoding: BufferEncoding;
      flag?: string | undefined;
    }
  | BufferEncoding;

export function fileExists(path: fs.PathLike): boolean {
  return fs.existsSync(path);
}

export function writeFile(
  file: fs.PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView
) {
  fs.writeFileSync(file, data);
}
export function appendFile(file: fs.PathOrFileDescriptor, data: string) {
  fs.appendFileSync(file, data);
}

export function readFile(
  file: fs.PathOrFileDescriptor,
  options: readFileOptions
) {
  return fs.readFileSync(file, options);
}
