import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

function newSignUp(req, res) {
  res.render('auth/sign-up')
}

async function signUp(req, res) {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    
    return res.render('message', {message: "this username is taken"})
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.render('message', {message: "Password and Confirm Password must match"})
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword
  const user = await User.create(req.body)
  req.session.user = {
    username: user.username,
    _id: user._id
  }
  req.session.save(() => {
    res.redirect('/tasks')
  })
}

function newSignIn(req, res) {
  res.render('auth/sign-in' , {title: "Sign in to Day Planner"})
}
async function signIn(req, res) {
  const userInDatabase = await User.findOne({ username: req.body.username }).select('+password')
  if (!userInDatabase) {
    return res.render('message', {message: "Login failed. Please try again."})
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.render('message', {message: "Login failed. Please try again."})
  }
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  }
  req.session.save(() => {
    res.redirect('/tasks')
  })
}

function signOut(req, res) {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

export {
  newSignUp,
  signUp,
  newSignIn,
  signIn,
  signOut
}