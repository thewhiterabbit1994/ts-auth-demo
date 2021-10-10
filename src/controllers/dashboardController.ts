const dashboardHandler: EController = (req, res, next) => {

  res.render('dashboard', {
    global: req.ejsGlobal,
    user: req.user
  })
}

export default {
  dashboardHandler
}