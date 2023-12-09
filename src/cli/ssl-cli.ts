import { SSLDEV_CONFIG_FREEZE } from '../constants';
import { createCommand, path, getHttpsPackageJson } from '../utils';
import { runCommand } from './run-command';

export const sslCli = () => {
  const cli = (command: string, args?: string[]) => {
    const httpsPackageJson = getHttpsPackageJson();
    const scripts = httpsPackageJson.scripts;
    if (scripts === undefined) {
      console.error('file not found');
      process.exit(1);
    }
    const httpsPackageName = httpsPackageJson.name;
    if (httpsPackageName === undefined) {
      console.error('httpsPackageName not found');
      process.exit(1);
    }

    const [executable, moduleLib] = scripts[command].split(' ');
    const pwd = process.env.PWD;
    const moduleLibPath = path.resolve(
      `${pwd}`,
      'node_modules',
      httpsPackageName,
      moduleLib
    );
    const options: string | undefined = args?.join(' ');
    runCommand(executable, [moduleLibPath, options]);
  };

  process.argv.slice(2);
  const program = createCommand('ssldev');
  program
    .name('ssldev')
    .usage('command [options]')
    .version('0.1.0')
    .command('setup', { isDefault: true })
    .description('generate config file')
    .action(() => cli('setup'));

  program
    .command('start')
    .description('start server https')
    .action(() => cli('start'));

  program
    .command('mkcert')
    .description('generate ssl keys')
    .option('-d, --domain <string>', 'specified domain', 'publicDomain')
    .option('-p, --path <string>', 'specified path', 'ssl')
    .action(() => cli('mkcert', process.argv));

  program.parse(process.argv);
};

(async () => {
  const args = process.argv[1].split('node_modules');
  const length = args.length;
  if (args[length - 1] == SSLDEV_CONFIG_FREEZE.SSLDEV_BIN) {
    sslCli();
  }
})();
