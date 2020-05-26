# init git fot heroku
cd "$PWD/publish"
rm -r "$PWD/node_modules"
# git init
heroku git:remote -a jwt-token-manager 
git pull
# set heroku repo
git add .    
git commit -am "deploy heroku"
git push heroku master

# open  https://jwt-token-manager.herokuapp.com/