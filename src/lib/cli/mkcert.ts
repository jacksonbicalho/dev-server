#! /usr/bin/env node --harmony

import path from 'path';

const { program } = require('@commander-js/extra-typings');
const { execFile } = require('child_process');
const { defaultConfig } = require('../config');

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
    // @ts-ignore: Unreachable code error
    (error, stdout, stderr) => {
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
