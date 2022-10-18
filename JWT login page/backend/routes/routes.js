import express from 'express'
import {  login, routing } from '../controller/LoginController.js'
import { adminPage, home,userPage, donotmatch, errorPage, notfound, fetchUsers} from '../controller/ViewController.js'
import { verifyToken, verifyAdmin, verifyOut } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controller/RefreshController.js'

const router = express.Router();

router.get('/', verifyOut, home)

router.get('/admin', verifyAdmin, adminPage)

router.get('/user', verifyToken,userPage)

router.get('/donotmatch', donotmatch)

router.get('/error', errorPage)

router.get('/notfound', notfound)

router.get('/users', fetchUsers)

router.post('/login', login)

router.get('/refresh', refreshToken)

router.post('/routing', routing)

export default router