import { Task } from "../models/task.js"
import { Cat } from "../models/cat.js"

async function index(req, res) {
  try {
    const tasks = await Task.find({owner : req.session.user._id})
    const cats = await Cat.find({owner : req.session.user._id})
    res.render('tasks/index',  {tasks,cats, title:"Task List"})
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
    res.redirect('/tasks')
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}
async function show(req, res) {
  try {
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id)){
      res.render('tasks/show', {
        task, title: "Task Details"
    })
    }else{
      res.render('message' ,{message: "you don't have access to view this task"})
    }
  }catch (error) {
    console.log(error)
    res.redirect('/')
  }
}


async function deleteTask(req,res){
  try {
    const task = await Task.findById(req.params.taskId)
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
    //give access to user only to modify
    if (task.owner.equals(req.session.user._id)){
      res.render('tasks/edit', {task ,date, title : 'Edit Task'})
    }else{
      res.render('message' ,{message: "you don't have access to delete or modify this item"})
    }
    }catch(err){
      console.log(err)
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
    //give access to user only to modify
    if (task.owner.equals(req.session.user._id)){
      await task.updateOne(req.body)
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

async function move(req,res){
  try {
    const cat = await Cat.findById(req.body.catId)
    const task = await Task.findById(req.params.taskId)
    //give access to user only to modify
    if (task.owner.equals(req.session.user._id) && cat.owner.equals(req.session.user._id)){
      if (!cat.taskList.includes(req.params.taskId)){
        cat.taskList.push(req.params.taskId)
        await cat.save()
        res.redirect(`/tasks`)
        }else{
          res.render('message' ,{message: `this task is Already in ${cat.title},`, })
        }
    }
    else{
      res.render('message' ,{message: "you don't have access to delete or modify this item"})
    }
    
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}

async function switchComplete(req,res){
  try {
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id)) {
      task.isComplete= (task.isComplete? false : true)
      await task.save()
      res.redirect('/tasks')
    } else {
      res.render('message' ,{message: "you don't have access to modify this Task"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}
export {
  index,
  show,
  newTask as new,
  create,
  deleteTask as delete,
  edit,
  update,
  move,
  switchComplete

}