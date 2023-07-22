#!/usr/bin/env sh

set -e
yarn docs:build
cd docs/

git init
git add -A
git commit -m 'Deployed manually'

git push -f https://github.com/the-this-pointer/the-this-pointer.github.io.git master:gh_pages

cd ../
