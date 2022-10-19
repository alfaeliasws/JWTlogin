import jwt from 'jsonwebtoken'
import { triggerRefresh } from './triggerRefresh'

export async function verifyAdmin(req, res, next){

    //getting to /admin endpoint
    if(!req.query.check){
        triggerRefresh(req, res,"admin")
    }

    //if there is passingToken in query after login
    if(req.query.check)
    {

        let token = ""
        let refreshToken = ""
        let reload = false

        const passingToken = req.query.check

        //verifying passingToken
        jwt.verify(passingToken, process.env.PASSING_TOKEN_SECRET,(err, realToken) => {
            //handling error
            if(err) {
                if(realToken === undefined){
                    reload = true
                }
            }

            //handling success parsing passingToken
            if(realToken){
            token = realToken.token
            refreshToken = realToken.refreshToken
            }
        })

        //if no token
        if (token == null) return res.json({message: "token not found"})

        //verifying accessToken
        if(reload === false){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => 
                {
                    if(err) return res.json({message: "error parsing accessToken"})
                    if(user && user.role !== "admin") return res.redirect('/')
                    if(user && user.role === "admin")
                    username = user.username
                    password = user.password
                    res.cookie('accessToken', token, {
                        httpOnly: true,
                        maxAge: 10 * 60 * 1000
                    })
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })

                    next()
                }
            )
        }

        // if passing token expired
        if(reload === true){
            triggerRefresh(req, res, "admin")
        }


    }
}

export async function verifyToken(req, res, next){

    //getting to /admin endpoint
    if(!req.query.check){
        triggerRefresh(req, res,"user")
    }

    //if there is passingToken in query after login
    if(req.query.check)
    {

        let token = ""
        let refreshToken = ""
        let reload = false

        const passingToken = req.query.check

        //verifying passingToken
        jwt.verify(passingToken, process.env.PASSING_TOKEN_SECRET,(err, realToken) => {
            //handling error
            if(err) {
                if(realToken === undefined){
                    reload = true
                }
            }

            //handling success parsing passingToken
            if(realToken){
            token = realToken.token
            refreshToken = realToken.refreshToken
            }
        })

        //if no token
        if (token == null) return res.json({message: "token not found"})

        //verifying accessToken
        if(reload === false){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => 
                {
                    if(err) return res.json({message: "error parsing accessToken"})
                    if(user && user.role !== "user") return res.redirect('/')
                    if(user && user.role === "user")
                    res.cookie('accessToken', token, {
                        httpOnly: true,
                        maxAge: 10 * 60 * 1000
                    })
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })

                    next()
                }
            )
        }

        // if passing token expired
        if(reload === true){
            triggerRefresh(req, res, "user")
        }

    }
}

export function verifyOut(req,res,next){
    if(!req.headers.cookie){
        // console.log("it is working")
        next()
    }

    if(req.headers.cookie){
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        // console.log("it is working")

        next()
    }
}