#!/bin/bash

# https://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
set -Eeuo pipefail

cd e2e

# if clean argument provided, remove js files
if [ ${1:-"nothing"} == "-c" ]
  then
    rm -f *.js
    exit 0
fi

# compile tests to JS
for test in *.ts; do
    [ -f "$test" ] || break # Guard - in case there are no files
    npx tsc $test
done

# run all JS tests
for test in *.js; do
    [ -f "$test" ] || break # Guard - in case there are no files
    node $test
done
