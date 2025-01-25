#!/bin/bash
original_wd=$PWD
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Original working dir: $original_wd"
echo "Script dir: $parent_path"

declare -A jsfileshash
declare -A jsfilesname
for file in ./wwwroot/**/*; do
    if [[ $file == *.js ]]; then
        hash=$(shasum -a 256 $file | awk '{print $1}')
        shorthash=${hash:0:16}
        jsfileshash[$file]="$shorthash"
        jsfilesname[$file]=$(basename -- "$file")
    fi
done
for file in ./wwwroot/**/*; do
    if [[ $file == *.js || $file == *.html ]]; then
        # sed -Er -i.bu "s/([a-z]|[A-Z]|\d|^\s+)(\.js){1}(\?version=)?([a-z]|[A-Z]|[0-9])*/\1\2\?version=$shorthash/g" $file
        for key value in ${(kv)jsfilesname}; do
            ashorthash=${jsfileshash[$key]}
            sed -Er -i.bu "s/($value){1}(\?version=)?([a-z]|[A-Z]|[0-9])*/\1\?version=$ashorthash/g" $file
        done
    fi
done
# test med bash 4 på serveren . hugs og endra shebang og køyr med "bash build.sh"
#sed -Er -i.bu "s/([a-z]|[A-Z]|\d|^\s+)(\.js){1}(\?version=)?([a-z]|[A-Z]|[0-9])*/\1\2\?version=$shorthash/g" $file

cd "$original_wd"
