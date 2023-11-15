import { runCommand } from '../cli/run-command';
import { getPackageJson } from '../../utils/get-package-json';
import { createCommand } from '@commander-js/extra-typings';
import path from 'path';

process.argv.slice(2);

const exeCommand = (command: string, args?: string[]) => {
  const packageJson = getPackageJson();
  const scripts = packageJson.scripts;
  const pwd = process.env.PWD;
  const [executable, moduleLib] = scripts[command].split(' ');
  const moduleLibPath = path.resolve(`${pwd}`, 'node_modules', packageJson.name, moduleLib )
  const options: string | undefined = args?.join(' ');
  runCommand(executable, [moduleLibPath, options]);
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

program.parse(process.argv);
