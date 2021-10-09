import express from 'express'

import AuthControllers from '@src/controllers/AuthControllers'

const router = express.Router()

router.post('/signup', AuthControllers.POST_signUp)
router.post('/loginAttempt', AuthControllers.POST_loginAttempt)
router.post('/login', AuthControllers.POST_LogIn)

export default router