import path from "path";
import type { PromptObject } from "prompts";
import { getDefaultConfig } from "./get-default.config";
const defaultConfig = getDefaultConfig();
export const defaultQuestions: Array<PromptObject> = [
  {
    choices: [
      { title: "java script", value: "js" },
      { title: "JSON", value: "json" },
    ],
    initial: 0,
    message: "Qual modelo de arquivo deseja criar",
    name: "fileType",
    type: "select",
  },
  {
    initial: "https.config.[json | js]",
    message: "qual o nomde do arquivo deseja usar",
    name: "fileName",
    type: "text",
  },
  {
    initial: "localhost",
    message: "qual o nomde do domínio deseja usar",
    name: "publicDomain",
    type: "text",
  },
  {
    initial: path.join(`${defaultConfig.rootApp}`, "ssl"),
    message: "qual o caminho para armazenar as chaves ssl",
    name: "keysPath",
    type: "text",
  },
  {
    initial: "8088",
    message: "qual porta vamos usar",
    name: "webPort",
    type: "text",
  },
];

export const confirm: PromptObject = {
  initial: true,
  message: "vamos criar o arquivo a configuração? [Y/n]",
  name: "createConfig",
  type: "confirm",
};

