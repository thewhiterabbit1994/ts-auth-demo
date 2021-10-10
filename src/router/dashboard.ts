import express from 'express'

import dashboardController from '@src/controllers/dashboardController'

const router = express.Router()

router.get('/', dashboardController.dashboardHandler)

export default router