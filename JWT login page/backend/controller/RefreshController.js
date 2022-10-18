import Users from "../models/Model";
import jwt from 'jsonwebtoken'

export async function refreshToken(req, res){
    try {
        const cookiesArray = req.headers.cookie.split("; ")
        const refreshTokenCookies = cookiesArray.filter(item => item.includes("refreshToken"))
        const refreshToken = refreshTokenCookies[0].replace("refreshToken=","")
        if(!refreshToken) return res.status(401)
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id
            const username = user[0].username
            const email = user[0].email
            const role = user[0].role
            const accessToken = jwt.sign({userId, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "10m"
            })
            res.json({ accessToken })
        });
    } catch (error) {
        console.log(error)
    }
}