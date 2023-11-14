import path from 'path';

const getPackage = () => {
  try {
    const appRoot = require('app-root-path');
    return require(path.join(appRoot.path, 'package.json'));
  } catch (error) {
    throw error;
  }
};

export const getPackageInfo = () => {
  const dir = path.resolve(process.cwd());
  const nodeModulesDir = path.join(dir, 'node_modules');
  const packageDir = path.resolve(nodeModulesDir, getPackage().name);
  const packageJsonInstalled = require(path.join(packageDir, 'package.json'));
  const data = {
    packageJson: packageJsonInstalled,
    dir: dir,
    packageDir: packageDir,
    scripts: packageJsonInstalled.scripts
  };
  return data;
};
