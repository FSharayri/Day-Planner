import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as catsCtrl from '../controllers/cats.js'

const router = Router()

// protected routes
router.get('/', isSignedIn, catsCtrl.index)
router.get('/new', isSignedIn, catsCtrl.new)
router.get('/:catId', isSignedIn, catsCtrl.show)




//create new task -protected
router.post('/', isSignedIn, catsCtrl.create)


export { router }
