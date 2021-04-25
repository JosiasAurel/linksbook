
const mongoose = require("mongoose");

// User model
const UserSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    linkBooks: [{type: mongoose.Schema.Types.ObjectId, ref: "linksbooks"}],
    wantPro: String,
    plan: String
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

