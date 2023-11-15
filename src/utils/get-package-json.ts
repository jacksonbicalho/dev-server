import { readFile } from './files';
import path from "path";

export const getPackageJson = () => {
  const packageJsonDir = path.resolve(`${process.env.OLDPWD}`, 'package.json');
  const packageJsonObj = JSON.parse(readFile(packageJsonDir));
  const packageName = packageJsonObj.name;
  const packageJsonDirInstalled = path.resolve(`${process.env.INIT_CWD}`, 'node_modules', packageName, 'package.json');
  const packageJsonObjInstalled = JSON.parse(readFile(packageJsonDirInstalled));
  return packageJsonObjInstalled;
};
