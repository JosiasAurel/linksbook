// api function to create user

const mongoose = require("mongoose");

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
// Link model
const LinkSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String
});

// link model
const Link = mongoose.model("link", LinkSchema);


// LinksBook Model
const LinksBookSchema = mongoose.Schema({
    title: String,
    description: String,
    links: Array
});

const LinksBook = mongoose.model("linksbook", LinksBookSchema);

// User model
const UserSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    linksBook: Array
});

const User = mongoose.model("users", UserSchema);

/* End models */

const logIn = (req, res) => {
    res.send("Hello world";)
}

module.exports = logIn;