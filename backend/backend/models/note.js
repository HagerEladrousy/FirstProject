const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  doctor: { type: String, required: true }, 
  user: { type: String, required: true },
  content: { type: String, required: true }, 
  createdAt: { type: Date, required: true } 
});

module.exports = mongoose.model('note', noteSchema);
