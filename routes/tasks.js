import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as tasksCtrl from '../controllers/tasks.js'

const router = Router()

// protected routes
router.get('/', isSignedIn, tasksCtrl.index)




export { router }
