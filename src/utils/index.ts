export * from './common';
export * from './file';
export * from './package-json';

import { CONSTANTS } from '../';

export type ErrorSsldevType = {
  type:
    | typeof CONSTANTS.SSLDEV_ERROR_TYPE_ERROR
    | typeof CONSTANTS.SSLDEV_ERROR_TYPE_WARN
    | typeof CONSTANTS.SSLDEV_ERROR_TYPE_INFO;
  message: string;
};
export const ErrorSsldev = ({ message, type }: ErrorSsldevType) => {
  return new Error(`${type}: ${message}`);
};
