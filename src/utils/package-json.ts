import path from 'path';
import type { PackageJson } from 'types-package-json';
import { fileExists, readFile } from './file';
import { ErrorSsldev } from '.';
import { CONSTANTS } from '../constants';

export const packageJson = {
  readContent(file: string): Partial<PackageJson> {
    if (!fileExists(file)) {
      throw ErrorSsldev({
        type: CONSTANTS.SSLDEV_ERROR_TYPE_ERROR,
        message: 'file not found'
      });
    }

    return JSON.parse(
      readFile(file, {
        encoding: 'utf-8',
        flag: 'r'
      })
    );
  },

  search(): Partial<PackageJson> {
    const directories = Object.values(module.paths).flatMap((directory) =>
      directory.split('node_modules')
    );
    const files: Partial<PackageJson>[] = [];
    directories.map((dir) => {
      const file = path.join('node_modules', dir, 'package.json');
      if (fileExists(file)) {
        const packageJson = this.readContent(file);
        const index = files.findIndex((f) => f.name === packageJson.name);
        if (index == -1) {
          files.push(packageJson);
        }
      }
    });
    if (files.length < 1) {
      throw ErrorSsldev({
        type: CONSTANTS.SSLDEV_ERROR_TYPE_ERROR,
        message: 'file not found'
      });
    }
    return files[0];
  },

  read(file?: string): Partial<PackageJson> {
    if (!file) {
      return this.search();
    }

    return this.readContent(file);
  }
};
