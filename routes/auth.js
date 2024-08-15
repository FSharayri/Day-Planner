import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'
import { isSignedOut } from '../middleware/is-signed-in.js'

const router = Router()

// /auth/sign-up
router.get('/sign-up',isSignedOut, authCtrl.newSignUp)
// /auth/sign-in
router.get('/sign-in',isSignedOut, authCtrl.newSignIn)

// /auth/sign-out
router.get('/sign-out', authCtrl.signOut)
router.post('/sign-up',isSignedOut, authCtrl.signUp)
router.post('/sign-in',isSignedOut, authCtrl.signIn)

export { router }
