import { JestConfigWithTsJest } from 'ts-jest';
import { readFile, writeFile } from '../src/utils/file';
import path from 'path';
import { CONSTANTS } from '../src';
const coverageSummaryFilePath = path.join(
  __dirname,
  '..',
  CONSTANTS.SSLDEV_COVERAGE_PATCH,
  'coverage-summary.json'
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const coverageSummaryFile = require(`${coverageSummaryFilePath}`);

type ItensTotals = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

type Totals = {
  lines: number;
  statements: number;
  functions: number;
  branches: number;
  branchesTrue: number;
};

type TotalsConfigured = Totals | undefined;

type TotalsProcessed = {
  lines: ItensTotals;
  statements: ItensTotals;
  functions: ItensTotals;
  branches: ItensTotals;
  branchesTrue: ItensTotals;
};

const getCoverageProcessed = (processed: TotalsProcessed): Totals => {
  const totalsProcessed = Object.create({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(processed).map((proc, _i) => {
    const key = proc[0];
    const value = proc[1].pct;

    if (!totalsProcessed[key]) {
      totalsProcessed[key] = value;
    }
    totalsProcessed[key] = value;
  });

  delete totalsProcessed[0];

  return totalsProcessed;
};

const getCoverageConfigured = (
  configured: TotalsConfigured | undefined
): Totals => {
  if (configured == undefined) {
    return {
      lines: 0,
      statements: 0,
      functions: 0,
      branches: 0,
      branchesTrue: 0
    };
  }
  return configured;
};

const buildNewsTotals = (
  totalsConfigured: Totals,
  totalsProcessed: Totals
): Totals => {

  let reset = false
  const args = process.argv.slice(2);
  if (args.includes('-reset')) {
    reset = true;
  }

  let newsTotals:Totals = {} as Totals

  if (reset) {
    Object.entries(totalsConfigured).map((tot) =>{
      newsTotals[String(tot[0]) as never] = Math.min(totalsProcessed[tot[0] as never], tot[1]) as never
    })

    return newsTotals;
  }

  newsTotals = {
    lines:
      totalsConfigured.lines < totalsProcessed.lines
        ? totalsProcessed.lines
        : totalsConfigured.lines,
    statements:
      totalsConfigured.statements < totalsProcessed.statements
        ? totalsProcessed.statements
        : totalsConfigured.statements,
    functions:
      totalsConfigured.functions < totalsProcessed.functions
        ? totalsProcessed.functions
        : totalsConfigured.functions,
    branches:
      totalsConfigured.branches < totalsProcessed.branches
        ? totalsProcessed.branches
        : totalsConfigured.branches,
    branchesTrue:
      totalsConfigured.branchesTrue < totalsProcessed.branchesTrue
        ? totalsProcessed.branchesTrue
        : totalsConfigured.branchesTrue
  };

  return newsTotals;
};

const teardown = async (
  globalConfig: JestConfigWithTsJest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _projectConfig: JestConfigWithTsJest
) => {
  const configGlobal: TotalsConfigured = globalConfig.coverageThreshold
    ?.global as never;
  const totalsConfigured: Totals = getCoverageConfigured(configGlobal);
  const totalsProcessed: Totals = getCoverageProcessed(
    JSON.parse(JSON.stringify(coverageSummaryFile.total))
  );
  const newsTotals: Totals = buildNewsTotals(totalsConfigured, totalsProcessed);
  const jestCoverageConfigPath = path.resolve('./jest/jest.coverage.config.json');
  const dataJestCoverageConfig = readFile(jestCoverageConfigPath, {
    encoding: 'utf-8',
    flag: 'r'
  });
  const dataJestCoverageJson = JSON.parse(dataJestCoverageConfig);
  dataJestCoverageJson.coverageConfig.coverageThreshold.global = newsTotals;
  writeFile(
    jestCoverageConfigPath,
    JSON.stringify(dataJestCoverageJson, null, 2)
  );
};

module.exports = teardown;
