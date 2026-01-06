#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh mongo-primary:27017
/opt/wait-for-it.sh mongo-secondary:27017
/opt/wait-for-it.sh maildev:1080
npm install --ignore-scripts --include=dev
npm run seed:run:document
npm run start:dev
