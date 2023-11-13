#!/bin/sh

rm -rf build

(
  cd ./docusaurus || exit
  npm install
  npm run build
)
  
cp -r ./docusaurus/build ./build