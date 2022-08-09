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
  emailSubject: {
    type: String,
    default: '',
  },
  emailBody: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Image", ImageSchema);
