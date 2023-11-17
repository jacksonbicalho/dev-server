# `ssl-dev` - Servidor https para ser usado durante desenvolvimento

`ssl-dev` é uma ferramenta simples de ser usada que resolve principalmente as dificuldades de lidar com desenvolvimento de PWAs.

## Instalação

``` bash
npm install --save-dev ssl-dev
```

Ou
``` bash
yarn add --dev ssl-dev
```

## Comandos

Insira em scripts
``` json
  "scripts": {
    "ssl": "npx ssl"
  },
```

## Comandos

`ssl` responde aos seguintes comandos:

| **Opções**         | **Descrição**
|:-------------------|:----------------------------
| `-v --version`     | output the version number
| `-h --help`        | display help for command

| **Comando**        | **Descrição**
|:-------------------|:----------------------------
| `-v --version`     | Shows the help dialog
| `setup`            | generate config file
| `start`            | start server https
| `mkcert` [options] | generate ssl keys
| `help` [command]   | display help for command

## Problema
Quando você executar `mkcert`, receberá um mensagem de erro de permissão.
copie o caminho do arquivo /home/user......../mkcert.sh e de de permissão de execução



