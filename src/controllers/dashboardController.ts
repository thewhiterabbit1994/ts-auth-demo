import { EController } from '@src/lib/types'


const dashboardHandler: EController = (req, res, next) => {

  console.log('dashboard handler')

  res.render('dashboard', {
    global: req.ejsGlobal,
    user: req.user
  })
}

export default {
  dashboardHandler
}