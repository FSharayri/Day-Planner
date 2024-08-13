import { Task } from "../models/task.js"

async function index(req, res) {
  try {
    const tasks = await task.find({})
    res.render('users/index', {
      users
    })
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
  show
}