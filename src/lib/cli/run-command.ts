// #!/usr/bin/env node

import { stderr, stdout } from 'process';
/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @returns {Promise<void>} promise
 */
export const runCommand = (command: string, args: any[]): Promise<void> => {
  const cp = require('child_process');
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });
    executedCommand.on('error', (error: any) => {
      reject(error);
    });
    executedCommand.on('exit', (code: number) => {
      if (code === 0) {
        // @ts-ignore: Unreachable code error
        resolve(stdout ? stdout : stderr);
      } else {
        reject();
      }
    });
  });
};
