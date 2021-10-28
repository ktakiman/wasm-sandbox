#!/bin/bash

if [ "$0" = "$BASH_SOURCE" ]
then
  echo "please source this file instead. Hint:  $ . [file]"
  exit
fi

set -e

if [ ! -d "emsdk" ]; then
  echo "installing emsdk"
  git clone https://github.com/emscripten-core/emsdk.git
  cd emsdk
  ./emsdk install latest
  ./emsdk activate latest
  cd ..
else
  echo "emsdk already installed"
fi

source ./emsdk/emsdk_env.sh

echo ""

emcc -v

set +e
