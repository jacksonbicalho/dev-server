import fs from 'fs'

export function fileExists(path: fs.PathLike): boolean {
  return fs.existsSync(path)
}

export const writeFile =
  (file: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView) => {
    fs.writeFileSync(file, data)
  }

export const readFile = (file: fs.PathOrFileDescriptor) => {
  return fs.readFileSync(file, {
    encoding: 'utf8',
    flag: 'r',
  })
}
