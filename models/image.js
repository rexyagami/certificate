var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
  image: String,
  // createdBy: String,
  eventName: {
    type: String,
    // unique: true
  },
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Innovator"
  },
  variableData: {},
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Image", ImageSchema);
