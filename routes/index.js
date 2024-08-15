import { Router } from 'express'
import { isSignedOut } from '../middleware/is-signed-in.js'

const router = Router()

// GET localhost:3000/

router.get('/',isSignedOut, function(req, res) {
  res.render('index', {title: 'Main Page'})
})

export { router }
