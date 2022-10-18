import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from "./routes/routes.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

//Uncomment and run server to add table to your mysql
//Make sure to create .env file and populate your env with secret needed
// try {
//     await db.authenticate();
//     await Users.sync();
//     console.log('Database Connected ...')
// } catch (error) {
//     console.log
// }

const app = express()
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Cache-Control']
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)
app.use(cookieParser)

// app.use(express.urlencoded({extended: false}))

app.listen(process.env.PORT, () => {
    console.log(`Server active on http://localhost:${process.env.PORT}!`);
})

