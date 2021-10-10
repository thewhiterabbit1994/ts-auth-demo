import express from 'express'

import ViewController from '@src/controllers/ViewController'

import requireDashBoardAccess from '@src/lib/middlewares/checkIfuserIsSinedIn'

const router = express.Router()

router.get('/', ViewController.roothandler)
router.get('/login', requireDashBoardAccess, ViewController.loginPageHandler)


export default router