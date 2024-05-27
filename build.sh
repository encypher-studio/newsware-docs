#!/bin/sh

rm -rf build

(
  cd ./docusaurus || exit
  npm install
  npm run build
)

(
  cd ./docs
  npm i -g pnpm
  pnpm install
  pnpm run build
)

cp -r ./docusaurus/build ./build
cp -r ./docs/dist ./build/category-codes

npm install
npx asyncapi generate fromTemplate ./asyncapi/asyncapi.yaml @asyncapi/html-template@2.0.0 -o build/asyncapi