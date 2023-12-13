#!/bin/sh

rm -rf build

(
  cd ./docusaurus || exit
  npm install
  npm run build
)

cp -r ./docusaurus/build ./build
npm install
npx asyncapi generate fromTemplate ./asyncapi/asyncapi.yaml @asyncapi/html-template@2.0.0 -o build/asyncapi
