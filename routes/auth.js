import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

// /auth/sign-up
router.get('/sign-up', authCtrl.newSignUp)
// /auth/sign-in
router.get('/sign-in', authCtrl.newSignIn)

// /auth/sign-out
router.get('/sign-out', authCtrl.signOut)
router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)

export { router }
