import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as tasksCtrl from '../controllers/tasks.js'

const router = Router()

// protected routes
router.get('/', isSignedIn, tasksCtrl.index)
router.get('/new', isSignedIn, tasksCtrl.new)
router.get('/:taskId', isSignedIn, tasksCtrl.show)




//create new task -protected
router.post('/', isSignedIn, tasksCtrl.create)

//delete task -protected 
router.delete('/:taskId', isSignedIn, tasksCtrl.delete)
// view edit task -protected
router.get('/:taskId/edit', isSignedIn, tasksCtrl.edit)

//edit task -protected 
router.put('/:taskId', isSignedIn, tasksCtrl.update)
// move task to Cat
router.put('/move-task/:taskId', isSignedIn, tasksCtrl.move)

export { router }
