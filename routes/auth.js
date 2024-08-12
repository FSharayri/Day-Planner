import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

router.get('/sign-up', authCtrl.newSignUp)
router.get('/sign-in', authCtrl.newSignIn)
router.get('/sign-out', authCtrl.signOut)
router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)

export { router }
