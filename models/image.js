var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
  image: String,
  // createdBy: String,
  variableData: {},
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Image", ImageSchema);
