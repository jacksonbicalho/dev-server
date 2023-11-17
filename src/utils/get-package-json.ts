import path from 'path';
import type { PackageJson } from 'types-package-json';
import { fileExists, readFile } from '../utils';

export const getHttpsPackageJson = () => {
  const directories = Object.values(module.paths).flatMap((directory) =>
    directory.split('node_modules')
  );
  const files: Partial<PackageJson>[] = [];
  directories.map((dir) => {
    const file = path.join('node_modules', dir, 'package.json');
    if (fileExists(file)) {
      const packageJson = JSON.parse(readFile(file));
      const index = files.findIndex((f) => f.name === packageJson.name);
      if (index == -1) {
        files.push(JSON.parse(readFile(file)));
      }
    }
  });
  if (files.length < 1) {
    console.error('file not found');
    process.exit(1);
  }
  return files[0];
};
