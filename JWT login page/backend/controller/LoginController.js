import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../models/Model.js';
import axios from 'axios'

export async function routing(req,res){

    const { username, password } = req.body

    const data = await axios.post('http://localhost:5000/login',{
        username, password
    })

    const token = data.data.accessToken
    const refreshToken = data.data.refreshToken

    const passingToken = jwt.sign({token, refreshToken}, 
        process.env.PASSING_TOKEN_SECRET,{
        expiresIn: '3s'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async(err, user) => 
        {
            if(err) return res.json({message:"routing passing accessToken"})
            if(user && user.role === "admin") {
                res.redirect(`/admin?check=${passingToken}`)
        }
            if(user && user.role !== "admin") {
                res.redirect(`/user?check=${passingToken}`)
            }
        })
}

export async function login(req,res){
    const { username, password } = req.body

    const data = await axios('http://localhost:5000/users')
    const users = data.data

    try {

        //login using username
        let user =
            (users.find(user => user.username.toLowerCase() == username.toLowerCase() )) ?
            (users.find(user => user.username.toLowerCase() == username.toLowerCase() )) : 
            "username not found"

        //login using email
        if(user === "username not found"){
            user = users.find(user => user.email.toLowerCase() == username.toLowerCase()) ?
            user = users.find(user => user.email.toLowerCase() == username.toLowerCase()) :
            "user not found"
        }

        if(user === "user not found"){
            return res.json({message:"user not found"})
        }

        bcrypt.compare(password, user.password,
            async function(err, success){
                if(err){
                    console.log(err)
                    res.redirect('/error')
                }
                if(success){
                    const username = user.username
                    const email = user.email
                    const role = user.role

                    const accessToken = jwt.sign({username, email, role}, 
                        process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: '10m'
                    })

                    const refreshToken = jwt.sign({username, email, role}, 
                        process.env.REFRESH_TOKEN_SECRET,{
                        expiresIn: '1d'
                    })

                    user['refresh_token'] = refreshToken

                    await Users.update({
                        "refresh_token": user['refresh_token']
                    },
                    {
                        where: {"id" : user["id"]  }
                    }
                    )

                    return res.json({accessToken, refreshToken})

                }
                else{
                    return res.redirect('/donotmatch');
                }
            }
        )

    } catch (error) {
        console.log(error)
        return res.redirect('/error').status(500)
    }

}