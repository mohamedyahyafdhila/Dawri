const mongoose = require("mongoose");

const proUser = mongoose.model(
  "proUser",
  new mongoose.Schema({
    username: String,
    phoneNumber: Number,
    password: String,
    email: String,
    category:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],
    companyName: String,
    jobTitle: String,
    certificateImg: String,
    companyImg: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = proUser;
