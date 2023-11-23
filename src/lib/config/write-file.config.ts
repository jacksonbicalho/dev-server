import { writeFile } from '../../utils';
import path from 'path';
import prompts from 'prompts';
import { runCommand } from '../cli/run-command';

export const writeConfigJs = (config: prompts.Answers<string>) => {
  const cleanConfig = [
    'custonOrDefault',
    'confirmDefault',
    'fileType',
    'fileName',
    'createConfig'
  ];

  const file = path.resolve(`${config.rootApp}`, config.fileName);
  cleanConfig.map((conf) => delete config[conf]);

  const template = `
    const ssl = require('ssldev');
    // ## https://www.npmjs.com/package/serve-handler#options
    const config = ssl.defaultConfig.getDefaultConfig(#CONFIG#);
    module.exports = config
  `;
  const obj: { [k: string]: unknown } = {};
  Object.entries(config).map(
    (config: prompts.Answers<string>) => (obj[config[0]] = `${config[1]}`)
  );
  const codeStr = template.replace(
    '#CONFIG#',
    `${JSON.stringify(config, null, 2)}`
  );

  writeFile(`${file}`, `${codeStr}`);
  runCommand('prettier', [`${file}`, '--write'] as never);
};
