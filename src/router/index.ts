

import { Application } from "express"

import ViewRouter from './views'
import AuthRouter from './auth'
import DashBoardRouter from './dashboard'

import requireDashBoardAccess from '@src/lib/middlewares/requireDashBoardAccess'
import errHandlers from '@src/controllers/errControllers'

const _applyRoutes: (app: Application) => void = app => {
  app.use('/', ViewRouter)
  app.use('/auth/', AuthRouter)
  app.use('/dashboard/', requireDashBoardAccess, DashBoardRouter)

  app.use(errHandlers.fourOhFour)
  app.use(errHandlers.errorHandler)


}

export default _applyRoutes;