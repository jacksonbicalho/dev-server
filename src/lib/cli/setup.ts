// #!/usr/bin/env node

import chalk from "chalk";
import exit from "exit";
import prompts from "prompts";
import { defaultQuestions, confirm } from "../config/questions";
import { getDefaultConfig } from "../config/get-default.config";
import path from "path";
import { writeFile } from "../../utils";

const defaultConfig = getDefaultConfig();

const { rootApp } = defaultConfig;

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
  console.log(chalk.underline("Vamos criar um arquivo de configuração padrão para ajudá-lo\n"));

  let promptAborted = false;

  const configurations = (await prompts(defaultQuestions, {
    onCancel: () => {
      promptAborted = true;
    },
  })) as ConfigType;

  if (promptAborted) {
    console.log();
    console.log("Aborting...");
    return;
  }
  console.log("");

  const confirmSetup = (await prompts(confirm, {
    onCancel: () => {
      promptAborted = true;
    },
  })) as ConfirmSetupType;

  const fileConfig = path.join(rootApp, configurations.fileName.replace("[json | js]", `${configurations.fileType}`));
  configurations.fileName = fileConfig;

  const fileType = configurations.fileType;

  if (confirmSetup.createConfig) {

    const template = `
    import { getDefaultConfig } from '@jacksonbicalho/https-dev/Config'
    module.exports = function () {
      const config = getDefaultConfig({})
      return config
    }
    `;

    console.warn("Criar arquivo: ", fileConfig);
    delete configurations["fileName" as never];
    delete configurations["fileType" as never];
    if (fileType  == 'js') {
      writeConfigJs(fileConfig, configurations, template)
    }
    console.warn(configurations);
    console.info(rootApp);
  }
}


function makeReplacer() {
  let isInitial = true;

  return (key: string, value: any) => {
    if (isInitial) {
      isInitial = false;
      return value;
    }
    if (key === "") {
      // Omit all properties with name "" (except the initial object)
      return undefined;
    }
    return value;
  };
}




const writeConfigJs = (fileConfig : string, configurations: ConfigType, template: string) => {
  // const replacer = makeReplacer();
  const defaultConfig = getDefaultConfig(configurations);
  const content = JSON.stringify(template.replace('{}', defaultConfig as never), null, 2);
    writeFile(`${fileConfig}`, content);
};

runCLI();
