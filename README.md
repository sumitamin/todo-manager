# Backend is located in /
# Frontend is located in /client

# packages used in backend
bcryptjs - encryt/decrypt user password
body-parser - make all incoming request body available under req.body
concurrently - run front end and back end concurrently in one command 
cors - to allow request from another origin 
dotenv - save db credential, key etc. security purpose
express - node framework for backend application
jsonwebtoken - assign token for each user and make token based api
mongoose - connect to mongodb
nodemon - restart node on save

# packages used in frontend
@material-ui/core - ui package
@material-ui/icons - ui icon
@material-ui/lab - ui package
@react-pdf/renderer - pdf creator and download
axios - api calls to get login/signup and create/update/delete/archive task
connected-react-router - 
dotenv - set port to 3001
react - front end react library
react-dom - convert react javascript to dom element
react-drag-list - allow task list dragging to set priority
react-redux - binds react to redux
react-router - routing to different screen/page in website wrt to url
react-router-dom - binds react router to dom
react-router-scroll-4 - add scroll feature
react-scripts - includes scripts and packages for react
redux - globall store to save state which can be accessed by project
redux-logger - consoles each action call for redux, helps in debugging
redux-saga - middleware for redux, to perform all necessary task to save/update redux

# .env file
# credential and keys are saved in .env file
# connection string to mongodb is represented by dbUrl in, change it to yours if necessary

# sets to set up project
install latest node LTS
install npm or yarn globally
git clone

From root folder of project go to /client with
# cd client

install dependencies for frontend
# run -> 'yarn install' or 'npm install'

get back to root folder by
# cd ..

install dependencies for backend
# 'yarn install' or 'npm install'

run project
# 'npm run dev' or 'yarn run dev'

# project flow
login or sign up to log into application
add task of your choice
delete/ edit or archive task 
download task in pdf
change priority of task by dragging task items to desired position
header consist of link to archive task and logout of application
unarchive archived task
in archive task page will have option to go to task page on header