const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  prjectName: {
    type: String,
    required: true,
  },
  createdAt:{
    type: String,
    required: true
  },
  subTask: [{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "SubTask"
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
