import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as catsCtrl from '../controllers/cats.js'

const router = Router()

// protected routes
router.get('/', isSignedIn, catsCtrl.index)
router.get('/new', isSignedIn, catsCtrl.new)
router.get('/:catId', isSignedIn, catsCtrl.show)
router.get('/:catId/add-task', isSignedIn, catsCtrl.addTask)



//create new cat -protected
router.post('/', isSignedIn, catsCtrl.create)

//add a new task to the Category
router.put("/:catId/add-task/:taskId", isSignedIn , catsCtrl.addTaskToCat) 
router.put("/:catId/remove-task/:taskId", isSignedIn , catsCtrl.removeTaskFromCat) 


export { router }
