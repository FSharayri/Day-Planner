import { Task } from "../models/task.js"
import { Cat } from "../models/cat.js"
import session from "express-session"

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
 
    res.render('tasks/new',  { title:"Create Task"})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function create(req,res){
  try {
    //anytime the user creates a task it should to be incomplete by default
    req.body.isComplete = false 
    // refer the task to the logged in user 
    req.body.owner = req.session.user._id
    const task = await Task.create(req.body)
    const tasks = await Task.find({})
    res.render('tasks/index',  {tasks, title:"Task List"})
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}
// async function show(req, res) {
//   try {
//     const selectedUser = await User.findById(req.params.userId)
//     res.render('users/show', {
//       selectedUser
//     })
//   } catch (error) {
//     console.log(error)
//     res.redirect('/')
//   }
// }


async function deleteTask(req,res){
  try {
    const task = await Task.findById(req.params.taskId)
    console.log(task.owner)
    console.log(req.session.user._id)
    if (task.owner.equals(req.session.user._id)){
      await Task.findByIdAndDelete(req.params.taskId)
      res.redirect('/tasks')
    }
    else{
      res.render('message' ,{message: "you don't have access to delete or modify this item"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}



async function edit(req,res){
  try{
    const task = await Task.findById(req.params.taskId)
    let date = new Date(task.dueDate - new Date().getTimezoneOffset() * 60000)
    res.render('tasks/edit', {task ,date, title : 'Edit Task'})
    }catch(err){
      console.log(error)
      res.redirect('/tasks')
    }
}

async function update(req,res){
  try {
    const task = await Task.findById(req.params.taskId)
    //checkbox logic
    req.body.isComplete = !!req.body.isComplete 
    // refer the task to the logged in user 
    req.body.owner = task.owner
    await task.updateOne(req.body)
    const tasks = await Task.find({})
    res.render('tasks/index',  {tasks, title:"Task List"})
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}
export {
  index,
  // show,
  newTask as new,
  create,
  deleteTask as delete,
  edit,
  update,

}