import express, { ErrorRequestHandler } from 'express'

import bodyParser from 'body-parser'

import '@src/lib/server/db'

import dotenv from 'dotenv';

import _applyMiddleWares from '@src/lib/middlewares'
import _applyRoutes from '@src/router'

declare global {
  namespace Express {
    interface Request {
      ejsGlobal?: {
        domain: string  
      },
      user: any
    }
  }

  interface userDetails {
    _id: string,
    iat: number
  }
}

dotenv.config();

const app = express()

// app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(require('cookie-parser')())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true // ba false taghi kone hatman ! BE HICH ONWAN TAGHIR NAKONE (Jixer)
}));
app.set("view engine", "ejs")

_applyMiddleWares(app)
_applyRoutes(app)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)

  return res.send('500')
};

app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => console.log('app is running on localhost:3000'))