#!/bin/bash

if [ ! -f $1 ]; then
  echo "$1 does not exists"
  exit
fi

filename=${1%%.*}

outfile="../server/bin/${filename}.html"

emcc $1 -o $outfile
