#!/bin/bash
FILES="$@"
for i in $FILES
do
echo "Processing image $i ..."
/usr/bin/convert -thumbnail 300 $i thumb.$i
done

