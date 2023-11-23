#! /usr/bin/env node --harmony

import path from 'path';

import { program } from '@commander-js/extra-typings';
import { exec, execFile } from 'child_process';
import { defaultConfig } from '../config';

const appConfig = defaultConfig.getAppConfig();
export const options = program
  .option('-d, --domain <string>', 'specified domain', appConfig.publicDomain)
  .option('-p, --path <string>', 'specified path', appConfig.keysPath)
  .parse()
  .opts();

export const mkcert = () => {
  const mkcertSh = path.resolve(__dirname, 'mkcert.sh');
  execFile(
    `${mkcertSh}`,
    [options.domain, options.path],
    (error, stdout: unknown, stderr: unknown) => {
      if (error) {
        if (error.code == 'EACCES') {
          console.warn('você precisará usar sudo para criar o par de chaves');
          exec(
            `sudo chmod +x ${error.path} && yarn ssl mkcert`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
              console.log(`stdout: ${stdout}`);
            }
          );
          console.log(`chmod +x ${error.path}`);
        }
        return;
      }
      if (stderr) {
        console.warn(stderr);
      }
      console.log(stdout);
    }
  );
};

