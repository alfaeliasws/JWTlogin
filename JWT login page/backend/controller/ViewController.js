import Users from "../models/Model"

export function home(req, res){
    res.sendFile('login.html',{root: './frontend/'})
}

export function adminPage(req, res){
    res.sendFile('admin.html',{root: './frontend/'})
}

export function userPage(req, res){
    res.sendFile('user.html',{root: './frontend/'})
}

export function errorPage(req, res){
    res.sendFile('error.html',{root: './frontend/'})
}

export function donotmatch(req, res){
    res.sendFile('donotmatch.html',{root: './frontend/'})
}

export function notfound(req, res){
    res.sendFile('notfound.html',{root: './frontend/'})
}

export async function fetchUsers(req, res){
    const data = await Users.findAll()
    const users = await res.json(data)
    return users
}

export function routing(req, res){
    res.sendFile('routing.html',{root: './frontend/'})
}