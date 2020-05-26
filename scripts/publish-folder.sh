PUBLISH_FOLDER=./publish

mkdir $PUBLISH_FOLDER
npm run build --prefix ./client
cp ./client/build $PUBLISH_FOLDER/client
cp ./server $PUBLISH_FOLDER/server