import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
tasks: {
  type: [Schema.Types.ObjectId], 
  ref: 'Task',
},
cats: {
  type: [Schema.Types.ObjectId], 
  ref: 'Cat',
},
},
{
  timestamps: true
})

const User = mongoose.model("User", userSchema)

export {
  User
}