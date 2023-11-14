// #!/usr/bin/env node

/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @returns {Promise<void>} promise
 */
export const runCommand = (command: string, args: unknown[]): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cp = require('child_process');
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });
    executedCommand.on('error', (error: unknown) => {
      reject(error);
    });
    executedCommand.on('exit', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};
