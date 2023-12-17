import { PackageJson } from 'types-package-json';
import * as semver from 'semver';
import path from 'path';
import { packageJson } from '../src/utils/package-json';
import { CONSTANTS } from '../src/constants';
import { createCommand } from '@commander-js/extra-typings';

type NewVersionType = {
  release: semver.ReleaseType;
  identifier?: string;
  identifierBase?: semver.inc.IdentifierBase | false;
};

const filePath = path.resolve(
  __dirname,
  '..',
  CONSTANTS.SSLDEV_PACKAGE_FILE_NAME
);

export const version = {
  current(): string {
    const packageJsonContent: Partial<PackageJson> = packageJson.read(filePath);
    const currentVersion: string = String(packageJsonContent.version);
    return currentVersion;
  },

  increment(options: NewVersionType) {
    const current: string = this.current();
    const currentVersionClean: string = this.clean(current);
    const newVersion: string = String(
      semver.inc(
        currentVersionClean,
        options.release,
        options.identifier,
        options.identifierBase
      )
    );

    return newVersion;
  },

  clean(version: string): string {
    return String(semver.coerce(version));
  }
};

const run = async () => {
  process.argv.slice(2);
  const program = createCommand('version');
  program
    .name('version')
    .usage('command [options]')
    .version('0.1.0')
    .command('inc')
    .description('Incrementa a versão atual')
    .option(`-r, --release <string>`, 'specified releae')
    .option('-i, --identifier <string>', 'specified identifier')
    .option('-ib, --identifier_base <string>', 'specified identifier_base')
    .action(() => {
      version.increment(process.argv as never);
    });
  program.parse(process.argv);
};

(async () => {
  const args = process.argv[1].split('/');
  const length = args.length;
  if (args[length - 1] == 'version') {
    await run();
  }
})();
