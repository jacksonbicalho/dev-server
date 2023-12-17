#!/usr/bin/env bash

# This script does `yarn install` if a `yarn.lock` file is present, otherwise `npm install`

set -e

rm -rf node_modules
rm -rf dist


if [[ -n "${FAIL_ON_DIRTY_LOCKFILE}" ]]; then
  if [[ "${YARN_VERSION:0:2}" == "2." ]]; then
    YARN_OPTS="--immutable"
  else
    YARN_OPTS="--frozen-lockfile"
  fi
  NPM_CMD="ci"
else
  YARN_OPTS=""
  NPM_CMD="install"
fi

if [[ -f "${DOCKER_WORK_DIR}/yarn.lock" || -f "${DOCKER_WORK_DIR}/.yarnrc.yml" || -f "${DOCKER_WORK_DIR}/.yarnrc" ]]; then
  yarn install $YARN_OPTS
  # Check if the installed tree is correct. Install all dependencies if not
  yarn check --verify-tree || NODE_ENV=development yarn install
  yarn cache clean
elif [[ -f "${DOCKER_WORK_DIR}/pnpm-lock.yaml" ]]; then
  pnpm i --prefer-frozen-lockfile --prod
elif [[ -f "${DOCKER_WORK_DIR}/package-lock.json" || -f "${DOCKER_WORK_DIR}/npm-shrinkwrap.json" ]]; then
  npm $NPM_CMD
  npm cache clean --force
else
  npm install
  npm cache clean --force
fi
