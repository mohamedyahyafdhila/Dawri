const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.proUser = require("./proUser.model");
db.category = require("./category.model");
db.role = require("./role.model");


db.ROLES = ["user", "proUser"];

module.exports = db;