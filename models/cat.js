import mongoose from "mongoose"

const Schema = mongoose.Schema

const catSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  taskList:[{
    type: Schema.Types.ObjectId, 
    ref: 'Task',
  }],
  owner:{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  },{
  timestamps: true
  }
)

const Cat = mongoose.model("Cat", catSchema)

export {
  Cat
}