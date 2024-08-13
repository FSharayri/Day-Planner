import { Task } from "../models/task.js"
import { Cat } from "../models/cat.js"

async function index(req, res) {
  try {
    const tasks = await Task.find({})
    res.render('tasks/index',  {tasks, title:"Task List"})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function newTask(req,res){
  try {
    res.render('tasks/new',  {tasks, title:"Create Task"})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function create(req,res){
  try {
    //anytime the user creates a task it should to be incomplete by default
    req.body.isCompleted = false 
    // refer the task to the logged in user 
    req.body.owner = req.session.user._id
    const task = await Task.create(req.body)
    res.render('tasks/index',  {tasks, title:"Task List"})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
async function show(req, res) {
  try {
    const selectedUser = await User.findById(req.params.userId)
    res.render('users/show', {
      selectedUser
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

export {
  index,
  show,
  newTask as new,
  create,
}