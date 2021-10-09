

import { Application } from "express"

import ViewRouter from './views'
import AuthRouter from './auth'
import DashBoardRouter from './dashboard'

const _applyRoutes: (app: Application) => void = app => {
  app.use('/', ViewRouter)
  app.use('/auth/', AuthRouter)
  app.use('/dashboard/', DashBoardRouter)
}

export default _applyRoutes;