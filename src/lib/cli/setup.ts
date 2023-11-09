/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import exit from 'exit';
import prompts from 'prompts';
import {defaultQuestions, confirm } from '../config/questions';
import {getDefaultConfig} from '../config/get-default.config';
import path from 'path';
const defaultConfig = getDefaultConfig();
const {rootApp} = defaultConfig;

export async function runCLI(): Promise<void> {
  try {
    await runCreate(rootApp);
  } catch (error: unknown) {
    if (error instanceof Error && Boolean(error?.stack)) {
      console.error(chalk.red(error.stack));
    } else {
      console.error(chalk.red(error));
    }

    exit(1);
    throw error;
  }
}

export async function runCreate(rootApp: string): Promise<void> {

  // Start the init process
  console.log();
  console.log(
    chalk.underline(
      'Vamos criar um arquivo de configuração padrão para ajudá-lo\n',
    ),
  );

  let promptAborted = false;

  const configurations = (await prompts(defaultQuestions, {
    onCancel: () => {
      promptAborted = true;
    }
  })) as ConfigType;

  if (promptAborted) {
    console.log();
    console.log('Aborting...');
    return;
  }
  console.log('');

  const confirmSetup = (await prompts(confirm, {
    onCancel: () => {
      promptAborted = true;
    }
  })) as {  createConfig: boolean }

  const fileConfig = path.join(rootApp, configurations.fileName.replace('[json | js]', `${configurations.fileType}`))
  configurations.fileName = fileConfig

  if (confirmSetup.createConfig) {
    console.warn('Criar arquivo: ', fileConfig);
    delete configurations['fileName' as never];
    delete configurations['fileType' as never];
    console.warn(configurations);
    console.info(rootApp);
  }

};

runCLI()
