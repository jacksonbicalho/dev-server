#!/usr/bin/env node

import { runCommand } from '../lib/cli/run-command';
import { getPackageInfo } from '../utils/get-package-info';
import { createCommand } from '@commander-js/extra-typings';

import path from 'path';

const exeCommand = (command?: string, args?: string[]) => {
  const packageInfo = getPackageInfo();
  const binName: string | undefined = command
    ? command
    : args?.shift() ?? undefined;

  if (binName == undefined) {
    console.error('command not found'), process.exit(1);
  }

  const [programE, moduleLib] = packageInfo.scripts[binName].split(' ');
  const packageDirLib: string = path.join(packageInfo.packageDir, moduleLib);
  const options: string | undefined = args?.join(' ');
  runCommand(programE, [packageDirLib, options]);
};

const program = createCommand('https-dev');
program
  .name('https-dev')
  .usage('command [options]')
  .version('0.1.0')
  .command('setup', { isDefault: true })
  .description('generate config file')
  .action(() => exeCommand('setup'));

program
  .command('start')
  .description('start server https')
  .action(() => exeCommand('start'));

program
  .command('mkcert')
  .description('generate ssl keys')
  .option('-d, --domain <string>', 'specified domain', 'publicDomain')
  .option('-p, --path <string>', 'specified path', 'ssl')
  .action(() => exeCommand('mkcert', process.argv));

program
  .command('postinstall')
  .action(() => exeCommand('postinstall', process.argv));

program.parse(process.argv);
