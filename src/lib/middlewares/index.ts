
import { Application } from 'express'

import dotenv from 'dotenv'

dotenv.config()

const _applyMiddleWares: (app: Application) => void = app => {
  app.use('/', (req, res, next) => {
    console.log('**********')
    console.log(req.url)
    console.log('hi from middle wares')
    console.log('**********')
    next()
  })

  app.use('/', (req, res, next) => {
    
    req.ejsGlobal = {
      domain: process.env.DOMAIN!,
    }
    
    next()
  })
}

export default _applyMiddleWares;