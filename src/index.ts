import express, { NextFunction, Request, Response } from 'express'

import bodyParser from 'body-parser'

import '@src/lib/server/db'

import dotenv from 'dotenv';

import _applyMiddleWares from '@src/lib/middlewares'
import _applyRoutes from '@src/router'

declare global {
  namespace Express {
    interface Request {
      ejsGlobal?: {
        domain: string,
        isDashboard?: boolean,
        isLoggedIn?: boolean
      },
      user: any
    }
  }

  type EController = (req: Request, res: Response, next: NextFunction) => any
}

dotenv.config();

const app = express()

app.use(require('cookie-parser')())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs")

_applyMiddleWares(app)
_applyRoutes(app)



app.listen(process.env.PORT || 3000, () => console.log('app is running on localhost:3000'))