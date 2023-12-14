#!/bin/sh
set -e

if [ "$1" = 'yarn' ]; then
  exec yarn "$@"
fi

exec "$@"

