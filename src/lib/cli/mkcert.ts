#! /usr/bin/env node --harmony

import path from 'path';

import { program } from '@commander-js/extra-typings';
import { execFile } from 'child_process';
import { defaultConfig } from '../config';

const appConfig = defaultConfig.getAppConfig();
export const options = program
  .option('-d, --domain <string>', 'specified domain', appConfig.publicDomain)
  .option('-p, --path <string>', 'specified path', appConfig.keysPath)
  .parse()
  .opts();

const mkcert = () => {
  const mkcertSh = path.resolve(__dirname, 'mkcert.sh');
  execFile(
    `${mkcertSh}`,
    [options.domain, options.path],
    (error: unknown, stdout: unknown, stderr: unknown) => {
      if (error) {
        throw error;
      }
      if (stderr) {
        console.warn(stderr);
      }
      console.log(stdout);
    }
  );
};
module.exports = mkcert();
