#!/bin/sh

rm -rf build

(
  cd ./docs
  npm i -g pnpm
  pnpm install
  pnpm build:$1
)

cp -r ./docs/dist ./build

pnpm install
pnpm dlx @asyncapi/cli generate fromTemplate ./asyncapi/asyncapi.yaml @asyncapi/html-template@2.0.0 -o build/asyncapi