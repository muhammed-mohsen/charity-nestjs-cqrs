#!/usr/bin/env bash
set -e
/opt/wait-for-it.sh mongo-primary:27017
/opt/wait-for-it.sh mongo-secondary:27017

cat .env
npm run seed:run:document
npm run start:prod
