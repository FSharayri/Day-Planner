function isSignedIn(req, res, next) {

  if (req.session.user) {
    return next()
  }
  res.redirect('/')
}
function isSignedOut(req, res, next) {

  if (!req.session.user) {
    return next()
  }
  res.redirect('/auth/sign-out')
}

export {
  isSignedIn,
  isSignedOut
}


