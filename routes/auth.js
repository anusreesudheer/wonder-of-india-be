

import express from 'express'
import { login, register,getAllUser } from './../Controllers/authController.js'



const router = express.Router()

router.post("/register" ,register)
router.post('/login' ,login)
router.get("/",getAllUser)
// router.get('/logout',logout)

export default router;