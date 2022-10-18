import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function verifyAdmin(req, res, next){

    if(!req.query.check){
        const cookiesArray = req.headers.cookie.split("; ")
        const accessTokenCookies = cookiesArray.filter(item => item.includes("accessToken"))
        const accessToken = accessTokenCookies[0].replace("accessToken=","")

        const getNewAccessToken = await axios.get("http://localhost:5000/refresh",{
            headers: {cookie: req.headers.cookie}
        })

        const newAccessToken = getNewAccessToken.data.accessToken

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,(err, user) => 
        {
            if(err) return res.redirect('/notfound')
            if(user && user.role !== "admin") return res.redirect('/')
            if(user && user.role === "admin")
            res.clearCookie("accessToken")
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000
            })
            res.sendFile('admin.html',{root: './frontend/'})
        })

    }

    if(req.query.check)
    {

        let token = ""
        let refreshToken = ""

        const passingToken = req.query.check;


        jwt.verify(passingToken, process.env.PASSING_TOKEN_SECRET,(err, realToken) => {
            token = realToken.token
            refreshToken = realToken.refreshToken
            if(err) return res.json({message :"passing token expired"})
        })

        if (token == null) return res.redirect('/notfound')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => 
            {
                if(err) return res.redirect('/notfound')
                if(user && user.role !== "admin") return res.redirect('/')
                if(user && user.role === "admin")
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
}

export async function verifyToken(req, res, next){

    if(!req.query.check){
        const cookiesArray = req.headers.cookie.split("; ")
        const accessTokenCookies = cookiesArray.filter(item => item.includes("accessToken"))
        const accessToken = accessTokenCookies[0].replace("accessToken=","")

        const getNewAccessToken = await axios.get("http://localhost:5000/refresh",{
            headers: {cookie: req.headers.cookie}
        })

        const newAccessToken = getNewAccessToken.data.accessToken

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,(err, user) =>
        {
            if(err) return res.redirect('/notfound')
            if(user && user.role === "user")
            res.clearCookie("accessToken")
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000
            })

            res.sendFile('user.html',{root: './frontend/'})
        })

    }

    if(req.query.check){
        const passingToken = req.query.check;

        let token = ""
        let refreshToken = ""

        jwt.verify(passingToken, process.env.PASSING_TOKEN_SECRET,(err, realToken) => {
            token = realToken.token
            refreshToken = realToken.refreshToken
            if(err) return res.json({message :"passing token expired"})
        })

        if (token == null) return res.redirect('/notfound')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => 
            {
                if(err) return res.redirect('/notfound')
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