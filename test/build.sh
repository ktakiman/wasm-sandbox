#!/bin/bash

if [ ! -f $1 ]; then
  echo "$1 does not exists"
  exit
fi

set -x

filename=${1%%.*}

local_html="${filename}.html"
local_extra_js="${filename}_impl.js"

dest_html="../server/bin/${filename}.html"
dest_js="../server/bin/${filename}.js"
dest_extra_js="../server/bin/${local_extra_js}"

# need to add this to make _malloc and _free accessible
export_funcs="-s EXPORTED_FUNCTIONS=['_malloc','_free']"
allow_mem_grow="-s ALLOW_MEMORY_GROWTH=1"
wrap="-s EXPORTED_RUNTIME_METHODS=['cwrap','ccall']"

params="${export_funcs} ${allow_mem_grow} ${wrap}"

# can provide the custom .html instead if auto-generated .html is not desired
if [ -f $local_html ]; then
  echo "found local html file"
  # emcc $1 -o $dest_js -O2 -s EXPORTED_FUNCTIONS="['_malloc', '_free']"
  emcc $1 -o $dest_js $params

  cp $local_html $dest_html

  if [ -f $local_extra_js ]; then
    cp $local_extra_js $dest_extra_js
  fi
else
  emcc $1 -o $desthtm $params
fi

set +x
