import express from 'express'

import ViewController from '@src/controllers/ViewController'

const router = express.Router()

router.get('/', ViewController.roothandler)
router.get('/login', ViewController.loginPageHandler)

export default router