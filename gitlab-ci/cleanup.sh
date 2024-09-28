#!/bin/sh

### difference=$(diff branches folders | grep '^>' | cut -c 3- | grep -v 'bgaming-lobby-dev' | grep -v 'bgaming-lobby' | grep -v 'master')
difference=$(diff branches folders | grep '^>' | cut -c 3- | grep -v 'master')
if [ -z "$difference" ]; then
    echo "Cleanup stage skipped, no folders in R2 for deletion"
else
    echo "Starting folder deletion process"
    for folder in $difference; do
        echo "Deleting folder: $folder"
        aws s3 rm s3://bgaming-lobby-dev/$folder --recursive --endpoint-url $R2_ROOT_URL
    done
    echo "Folder deletion process completed"
fi

### TODO: clear old tags folders ?
