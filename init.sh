#!/bin/bash

## This file setups all prerequisites for the docker container, used both dev environment and in CI/CD pipeline.
## For prerequisites strictly related to dev environment see ./.devcontainer/init.sh which is run before this script.

# npm config set @nebulrgroup:registry https://gitlab.com/api/v4/projects/23536445/packages/npm/
# npm config set '//gitlab.com/api/v4/projects/23536445/packages/npm/:_authToken' $GITLAB_NPM_REPOSITORY_TOKEN

cd projects/nblocks-ionic
sudo npm install

cd ../..
sudo npm install

echo "Done initializing"