import express from 'express'

import dashboardController from '@src/controllers/dashboardController'

import requireDashBoardAccess from '@src/lib/middlewares/requireDashBoardAccess'

const router = express.Router()

router.get('/', requireDashBoardAccess, dashboardController.dashboardHandler)


export default router