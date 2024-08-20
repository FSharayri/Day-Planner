import { Task } from "../models/task.js"
import { Cat } from "../models/cat.js"

async function index(req, res) {
  try {
    const cats = await Cat.find({owner : req.session.user._id})
    res.render('cats/index',  {cats, title:"Categories"})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}


async function newCat(req,res){
  try {
    res.render('cats/new',  { title:"Create Category"})
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}


async function create(req,res){
  try {
    //anytime the user creates a task it should to be incomplete by default
    // refer the task to the logged in user 
    req.body.owner = req.session.user._id
    req.body.taskList = []
    const cat = await Cat.create(req.body)
    const cats = await Cat.find({owner : req.session.user._id})
    res.render('cats/index',  {cats, title:"Categories"})
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}

async function show(req, res) {
  try {
    const cat = await Cat.findById(req.params.catId).populate(['taskList'])
    const cats = await Cat.find({owner : req.session.user._id})
    if (cat.owner.equals(req.session.user._id)){
      res.render('cats/show', {
        cat,cats, title: "Categories"
    })
    }else{
      res.render('message' ,{message: "you don't have access to this Category"})
    } 
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}


async function addTask(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    const tasks = await Task.find({owner : req.session.user._id})
    if (cat.owner.equals(req.session.user._id)) {
      res.render('cats/add-task', {cat,tasks,title: `Add a Task to ${cat.title}`})
    }else{
      res.render('message', {message: "you are not the owner of this category"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}


async function addTaskToCat(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id) && cat.owner.equals(req.session.user._id)){
      if (!cat.taskList.includes(req.params.taskId)){
        cat.taskList.push(req.params.taskId)
        await cat.save()
        res.redirect(`/cats/${cat._id}`)
      }else{
        res.render('message' ,{message: `this task is Already in ${cat.title},`, })
      }
    }else{
      res.render('message' ,{message: "you don't have access to this task"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}

async function removeTaskFromCat(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id) && cat.owner.equals(req.session.user._id)){
      if (cat.taskList.includes(req.params.taskId)){
        const taskIndex =  await cat.taskList.indexOf(req.params.taskId)
        cat.taskList.splice(taskIndex,1)
        await cat.save()
        res.redirect(`/cats/${cat._id}`)
      }else{
        res.render('message' ,{message: `Error while removing task`, })
      }
    }else{
      res.render('message' ,{message: "you don't have access to this task"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}


async function moveTask(req,res){
  try {
    const newCat = await Cat.findById(req.body.catId)
    const oldCat = await Cat.findById(req.params.oldCatId)
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id) && newCat.owner.equals(req.session.user._id) && oldCat.owner.equals(req.session.user._id)){
      if (!newCat.taskList.includes(req.params.taskId)){ //checks the new cat doesnt already have that item
        //add task in new category
        newCat.taskList.push(req.params.taskId)
        await newCat.save()
        //remove task from old category
        const taskIndex =  await oldCat.taskList.indexOf(req.params.taskId)
        oldCat.taskList.splice(taskIndex,1)
        await oldCat.save()
        res.redirect(`/cats/${oldCat._id}`)
      }else{
        res.render('message' ,{message: `this task is Already in ${newCat.title},`, })
      }
    }else{
      res.render('message' ,{message: "you don't have access to this Category"})
    }
  }catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}

async function edit(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    if (cat.owner.equals(req.session.user._id)) {
      res.render('cats/edit', {cat,title: `Edit Category`})
    }else{
      res.render('message', {message: "you are not the owner of this category"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}

async function update(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    
    if (cat.owner.equals(req.session.user._id)){
      cat.title = req.body.title
      await cat.save()
      res.redirect(`/cats/${cat._id}`)
    }else{
      res.render('message' ,{message: "you don't have access to this Category"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }
}
async function deleteCat(req,res){
  try {
    const cat = await Cat.findById(req.params.catId)
    if (cat.owner.equals(req.session.user._id)){
      await cat.deleteOne()
      cat.save()
    }else{
      res.render('message' ,{message: "you don't have access to this Category"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/cats')
  }

}

async function switchComplete(req,res){
  try {
    const task = await Task.findById(req.params.taskId)
    if (task.owner.equals(req.session.user._id)) {
      task.isComplete= (task.isComplete? false : true)
      await task.save()
      const cat = await Cat.findById(req.params.catId)
      res.redirect(`/cats/`)
    } else {
      res.render('message' ,{message: "you don't have access to modify this Task"})
    }
  } catch (error) {
    console.log(error)
    res.redirect('/tasks')
  }
}

export {
  create,
  newCat as new,
  index,
  show,
  addTask,
  addTaskToCat,
  removeTaskFromCat,
  moveTask,
  edit,
  update,
  deleteCat as delete,
  switchComplete
}