#!/bin/zsh
# frontend build script
# add version-parameter to .js-files
# first, iterate all files
# second, if it is a js- or html-file,
echo "Adding versioning string to frontend static files to avoid cache issues"
for file in ./wwwroot/**/*(.);
    if [[ $file == *.js || $file == *.html ]]; then
        echo -n "$file ";
        # get checksum of file
        hash=$(shasum -a 256 $file | awk '{print $1}')
        # utilizing the 16 msb digits
        shorthash=${hash:0:16}
        echo " $shorthash"
        # adding the short hash as versioning string to all .js files to avoid potential caching were not wanteds
        sed -Er -i.bu "s/([a-z]|[A-Z]|\d|^\s+)(\.js){1}(\?version=)?([a-z]|[A-Z]|[0-9])*/\1\2\?version=$shorthash/g" $file
    fi
