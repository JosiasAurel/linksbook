
const mongoose = require("mongoose");

// User model
const UserSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    linkBooks: Array
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

