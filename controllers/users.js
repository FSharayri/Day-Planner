import { User } from "../models/user.js"

async function index(req, res) {
  try {
    const users = await User.find({})
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