// api function to get links book

const mongoose = require("mongoose");
// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);

const db = mongoose.connection;

/* Models */
const db = mongoose.connection;


/* Models */
const db = mongoose.connection;

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
    linkBooks: Array
});

const User = mongoose.model("users", UserSchema);

/* End models */

const getLinksBook = (req, res) => {
    let { userId } = req.body;
    LinksBook.find((err, linksbooks_) => {
        if (err) res.json({Error: "Could not get linksbooks"});
        res.json(linksbooks_);
    });
}

module.exports = getLinksBook;