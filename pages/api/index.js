
// load dependencies
const mongoose = require("mongoose");
const express = require("express");

// app instance
const app = express();

// enable json for api
app.use(express.json());

const mongoose = require("mongoose");

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
const db = mongoose.connection;


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
    linkBooks: Array
});

const User = mongoose.model("users", UserSchema);

/* End models */

app.post("/api/createuser", (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
        name: name,
        email: email,
        password: password,
        linksBook: []
    });

    newUser.save((err, user_) => {
        if (err) res.json({Error: "Could not create user"});
        res.json(user_);
    });
});

app.post("/api/createlink", (req, res) => {
    const {title, link, description } = req.body;
    const newLink = new Link({
        title: title,
        link: link,
        description: description
    });

    newLink.save((err, _link) => {
        if (err) res.json({ Error: err })
        res.send(_link);
    });
});

app.post("/api/createlinksbook", (req, res) => {
    let { title, description, links } = req.body;
    let newLinksBook = new LinksBook({
        title: title,
        description: description,
        links: []
    });

    newLinksBook.save((err, linksbook_) => {
        if (err) res.json({Error: "Could not create links book"});
        res.json(linksbook_);
    });
});

app.get("/api/getlinksbook", (req, res) => {
    let { userId } = req.body;
    LinksBook.find((err, linksbooks_) => {
        if (err) res.json({Error: "Could not get linksbooks"});
        res.json(linksbooks_);
    });
});

app.get("/api/getlinks", (req, res) => {
    Link.find((err, links) => {
        if (err) res.json({ Error: err })
        res.json(links)
    });
});

module.exports = app;