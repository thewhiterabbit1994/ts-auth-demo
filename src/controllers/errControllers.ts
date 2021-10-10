import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)

  return res.render('500', {
    global: req.ejsGlobal
  })
};


const fourOhFour: EController = (req,res,next) => {
  res.render('404', {
    global: req.ejsGlobal
  })
}

export default {
  errorHandler,
  fourOhFour
}