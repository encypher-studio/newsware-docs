#!/bin/sh

rm -rf build

(
  cd ./docusaurus || exit
  npm install
  npm run build
)
  
cp -r ./docusaurus/build ./build

npm install
npx asyncapi generate fromTemplate asyncapi.yaml @asyncapi/html-template@0.28.4 -o ./asyncapi --force-write
rm -rf ./build/asyncapi
cp -r ./asyncapi ./build/asyncapi