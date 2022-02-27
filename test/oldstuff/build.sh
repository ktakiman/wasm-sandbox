#!/bin/bash

pushd .

root="/home/kei/dev/web/wasm/test"

cd $root

# check if emcc is defined ? (= checking if emsdk_env.sh has been sourced already)
command -v emcc
check_emcc=$?

if [ $check_emcc = 0 ]; then
  echo 'emcc defined, building wasm'
  build_dir='build-wasm'
else
  echo 'emcc not defined, build regular c/c++ library'
  build_dir='build'
fi

echo "build_dir >>> '${build_dir}'"

if [[ (! -d $build_dir) || ($# = 1 && $1 = 'rebuild') ]]; then
  echo 'rebuiliding...'
  rm -rf $build_dir
  mkdir $build_dir
  cd $build_dir
  if [ $check_emcc = 0 ]; then
    emcmake cmake ..
  else
    cmake ..
  fi
else
  echo '** not ** rebuiliding...'
  cd $build_dir
fi

cmake --build .

cd ..

if [ $check_emcc = 0 ]; then 
  # copy files built from cmake
  cp ${root}/build-wasm/public/* ../server/bin

  # copy hand-written .html and .js files (optional)
  cp ${root}/src/* ../server/bin
fi

popd
