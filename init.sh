#!/bin/sh

cp -r $1template/* .
find . -type f -name "*.html" -o -name "*.json" | xargs sed -i '' "s/litpwatitleplaceholder/$2/g"
find . -type f -name "*.html" -o -name "*.json" | xargs sed -i '' "s/litpwapackagenameplaceholder/$4/g"
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.html" | xargs sed -i '' "s/litpwaelementprefixplaceholder/$3/g"

npm i