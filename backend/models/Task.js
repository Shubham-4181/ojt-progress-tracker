const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  },

  completedAt: {
    type: Date
  },

  userId: {
  type: String
}

});

module.exports =
  mongoose.model("Task", taskSchema);