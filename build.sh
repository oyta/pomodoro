#!/bin/zsh
# frontend build script
# add version-parameter to .js-files
# first, iterate all files
#     # second, if it is a js- or html-file,
echo "Adding versioning string to frontend static files to avoid cache issues"
for file in ./wwwroot/**/*(.);
    if [[ $file == *.js || $file == *.html ]]; then
        echo -n "$file ";
        hash=$(shasum -a 256 $file | awk '{print $1}')
        shorthash=${hash:0:10}
        echo " $shorthash"
        #(\w|\d)+(.js)+(\?version=(\w|\d)*)*

    fi
# calculate hash of file
# go through all the content and replace
# (\d|\c|\\/)(+\.js) with {1}{2}?version=hash
