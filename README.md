# README.md
[[Fleeting Notes MOC]]

# Login Page With JSON Web Token
## Introduction
This is my project in one of interview sequences that I take quite seriously because it is my first time to be diving in depth of using JWT.

## Stack Used
- HTML
- TailwindCSS (With CDN because the front-end doesn't take too much of styling)
- Javascript (modules and ES6) for handling function in middleware, and controller
- ExpressJS at the backend with body-parser, dotenv, and cookieParser
- Sequelize and mysql (mysql2 dependency) for DB, at first I think I should not use db, but the role of db in storing refreshToken is needed even though I am not configuring it so much

## Approach Used
- I use MVC with router and middleware approach as what I have done in laravel, although it is really a different kind of thoughts needed because using express means I am using req and res frequently
- The models doesn't quite much used, it only used to initialize and finding data needed, but still important in updating refreshToken in every login
- In the database I use bcrypt to encrypt user's passwords 
- I am not able to use authorization in header, I met difficulity in setting it from the client, because I use pure HTML, should consider to use react or solidJS at first, but I think I will focusing too much time in the frontend while the real challange is setting the backend for sure
- Instead I use cookies to keep the record my accessToken and refreshToken in the client
- I use `/routing` endpoint when the form submitted and there the login begins using axios and then I can fetch data from the respond of the login. Using JWT verify to know the role of the user and redirect them to the respective page
- To connect from `/routing` to the page, I use middleware to verify the user, I pass another token called `passingToken` in query parameters `check` that last for 3 seconds to make the connection and parse them and using jwt verify to verify the users. Passing Token consist of accessToken and refreshToken that is hased with JWT with another secret key in the env.
- To generate secret key in the env I use `require('crytpo').randomBytes(64).toString('hex)`
- The refresh will be triggered when the `passingToken` in query `check` is deleted, or the pure `/admin` (or `/user`) endpoints called
- To fetch the refresh I use axios.get and adding header cookie that is needed
- I use many validation in the middleware to ensure the flow is correctly run, in some part I parse the cookie with vanillaJS because cookieParser doesn't run in the file. The validation used mainly using the JWT verify itself that really help me

## What I've Learned in This Project
- This is my first time to build independently with my express js, even though independently I still use many references to keep up my comprehensiveness of this project
- I know that we can pass data securely with JWT from server to client
- Using headers and all in it to pass data
- Authorization and authentication differences
- More in depth of MVC in Node.js ecosystem

## Flow of Using The App
### Fork or download the file
### Set this in Env
```
ACCESS_TOKEN_SECRET=d7dc69cd15f2a4b3f3a92c9e1e4eee1067c5ffeca17fe6365dc6758d3a7ea7e6d7bad0fef535ecb2e00c3fbe72432b23340426c2d88ec3de9fea02f11eb838e3
REFRESH_TOKEN_SECRET=cf2b0f5ea70124a27641ec18ff3eceac8158e3d98cccad8396a6b68d9772eb9c7e3d4b15d2dde8eeb8715b605bd75dee3f8bf89be61702943d6e7330acd3794d
PASSING_TOKEN_SECRET=5c331af1b43a97e3f99119cc95339ae0603558f9f56c662f8e9a5e820f9294f1fc04ee030017840d3da2eef6b5add83f205f5c97606eb826875bdfdc18d24c08
```
### Mysql
- create a database, a user and password and use it in this variable in your .env file
```
DB_USERNAME= //put your DB username
DB_NAME= //put your DB name
DB_PASSWORD= //put your DB password
```
- Go to Server.js and uncomment the trycatch blog and run the script in the node so the data can be used
- Import data to your mysql either with myPhpAdmin or mysql workbench, the data is on the JWT Login Page root folder in data.sql file
### NODEMON
- I use nodemon to run the app so please use `npm i -g nodemon` to install nodemon globally in your device
### INSTALL DEPENDENCY
- Install your dependencies with `npm install` in your JWT Login Page folder so all the dependencies in package.json are able to run
### RUNNING APP
- Set `PORT=5000` in your .env file
- Use `npm run start` to run the app in PORT=5000
### DATA NEEDED
- You can login with username of email of the registered user in the data of mysql
- All passwords of the user is 123456
### EndPoint
- going to `/` will make the tokens disappear (similar to logout)
- login will bring you to `/admin` or `/user` depending on the role the user has and it will bring you to `/admin?check=....` or `/user?check=....`
- Go to `/admin` or `/check` to trigger the accessToken refresh

### REFERENCE
- M Fikri youtube: 
	- https://youtu.be/Ll_71n60vAM
- Web Dev Simplified youtube: 
	- https://www.youtube.com/watch?v=mbsmsi7l3r4
	- https://www.youtube.com/watch?v=7Q17ubqLfaM
	- https://www.youtube.com/watch?v=jI4K7L-LI58
- Axios documentation
- ExpressJS documentation
- and many Stackoverflows