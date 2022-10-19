import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function triggerRefresh(request, response, role){
    const req = request
    const res = response
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
        if(user && user.role !== `${role}`) return res.redirect('/')
        if(user && user.role === `${role}`)
        res.clearCookie("accessToken")
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
        })
        res.sendFile(`${role}.html`,{root: './frontend/'})
    })
}