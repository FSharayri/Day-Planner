import mongoose from "mongoose"

const Schema = mongoose.Schema

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  taskList:{
    type: Schema.Types.ObjectId, 
    ref: 'Task',
  },
  owner:{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  },{
  timestamps: true
  }
)

const Task = mongoose.model("Task", taskSchema)

export {
  Task
}