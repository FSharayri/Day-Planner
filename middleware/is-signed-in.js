function isSignedIn(req, res, next) {

  if (req.session.user) {
    return next()
  }
  res.redirect('/index')
}

export {
  isSignedIn
}