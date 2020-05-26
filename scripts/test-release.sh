SOURCE_LINK="$PWD/server"
DEST_LINK="$PWD/publish"

rm -fr "$DEST_LINK/node_modules"
ln -s "$SOURCE_LINK/node_modules" "$DEST_LINK"
# test build
cd "$DEST_LINK" 
node ./index.js

open https://localhost:5000

