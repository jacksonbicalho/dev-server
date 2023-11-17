# `https-dev` - Servidor https para ser usado durante desenvolvimento

`https-dev` é uma ferramenta simples de ser usada que resolve principalmente as dificuldades de lidar com desenvolvimento de PWAs.

## Instalação

Por enquanto `https-dev` está apenas no repositório do github:

Vocẽ precisa adicionar https://npm.pkg.github.com para o name space `@jacksonbicalho`

``` bash
  npm login --scope=@jacksonbicalho --auth-type=legacy --registry=https://npm.pkg.github.com
```
Agora é só instalar
```bash
npm install --save-dev @jacksonbicalho/https-dev
```

Ou
``` bash
yarn add --dev @jacksonbicalho/https-dev
```

## Comandos

Insira em scripts
``` json
  "scripts": {
    "https": "npx https-dev"
  },
```

## Comandos

`https` responde aos seguintes comandos:

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



