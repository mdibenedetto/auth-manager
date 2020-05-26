

PUBLISH_FOLDER=./publish

CLIENT_FOLDER=./client/dist
SERVER_FOLDER=./server/src/**

# SET publish folder
if [ -d "$PUBLISH_FOLDER" ]; then rm -Rf $PUBLISH_FOLDER; fi
mkdir -p $PUBLISH_FOLDER

# BUILD Client folder
# npm run build --prefix ./client
# COPY Client folder
cp -r $CLIENT_FOLDER $PUBLISH_FOLDER/client
# COPY Server folder
cp -fr ./server/src $PUBLISH_FOLDER/server
# COPY package.json
cp ./package.publish.json $PUBLISH_FOLDER/package.json 
# CREATE entry point file
echo 'require("./server/server.js");' > $PUBLISH_FOLDER/index.js
 
 