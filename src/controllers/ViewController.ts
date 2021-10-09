import { EController } from '@src/lib/types'

const roothandler: EController = (req, res, next) => {
  res.render('home', {
    global: req.ejsGlobal
  })
}

const loginPageHandler: EController = (req, res, next) => {
  res.render('login', {
    global: req.ejsGlobal
  })
}

export default {
  roothandler,
  loginPageHandler,
}