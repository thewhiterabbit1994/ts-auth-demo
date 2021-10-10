
import { Application } from 'express'

import dotenv from 'dotenv'

dotenv.config()

const _applyMiddleWares: (app: Application) => void = app => {

  app.use('/', (req, res, next) => {
    
    req.ejsGlobal = {
      domain: `${process.env.DOMAIN!}:${process.env.PORT!}`,
    }
    
    next()
  })
}

export default _applyMiddleWares;