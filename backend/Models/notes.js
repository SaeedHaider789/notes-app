import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema({
  user: String,
  title: String,
  date: String,
  content: String,
  isPinned: Boolean
})

const notesModel = mongoose.model('notes', schema)

export default notesModel