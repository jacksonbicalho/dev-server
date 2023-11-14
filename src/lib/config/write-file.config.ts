import { writeFile } from '../../utils';
import path from 'path';
import prompts from 'prompts';
import { runCommand } from '../cli/run-command';

export const writeConfigJs = (config: prompts.Answers<string>) => {
  const file = path.resolve(`${config.rootApp}`, config.fileName);
  delete config.fileType;
  delete config.fileName;
  delete config.createConfig;
  delete config.rootApp;

  const template = `
    const { defaultConfig } = require("@jacksonbicalho/https-dev");
    const config = defaultConfig.getDefaultConfig(#CONFIG#);
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
