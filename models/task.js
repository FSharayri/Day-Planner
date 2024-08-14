import mongoose from "mongoose"

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  isComplete:{
    type: Boolean,
    default: false,
  },
  dueDate: Date,
  owner:{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
  },{
  timestamps: true
  }
)

const Task = mongoose.model("Task", taskSchema)

export {
  Task
}