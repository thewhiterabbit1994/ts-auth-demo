import express from 'express'

import '@lib/server/db'

import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.get('/', (req, res, next) => {
  res.send('hello world !')
})

app.listen(process.env.PORT || 3000, () => console.log('app is running on localhost:3000'))