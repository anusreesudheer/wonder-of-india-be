

import express from 'express'
import { login, register,getAllUser,getSingleUser } from './../Controllers/authController.js'



const router = express.Router()

router.post('/register' ,register)
router.post('/login' ,login)
router.get("/:id", getSingleUser);
router.get("/",getAllUser)


export default router;