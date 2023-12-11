import { PackageJson } from 'types-package-json';
import * as semver from 'semver';
import path from 'path';
import { packageJson } from '../src/utils/package-json';
import { CONSTANTS } from '@src/constants';

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
