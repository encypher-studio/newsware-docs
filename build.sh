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
pnpm dlx @asyncapi/cli@5 generate fromTemplate ./asyncapi/asyncapi.yaml @asyncapi/html-template@3.5.6 -o build/asyncapi