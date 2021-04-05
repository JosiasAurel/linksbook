
// import required depedencies
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// load database schema
const Link = require("./models/links");
const User = require("./models/user");
const LinksBook = require("./models/linksbook");

// load environment variables
require("dotenv").config();

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
const db = mongoose.connection;


app.get("/getlinks",  (req, res) => {
    Link.find((err, links) => {
        if (err) res.send({Error: err})
        res.send(links);
    })
});

app.get("/getlinksbook",  (req, res) => {
    LinksBook.find((err, linksbooks) => {
        if (err) res.send({Error: err})
        res.send(linksbooks);
    });
});

app.post("/createlinksbook/:uid",  (req, res) => {
    const userId = req.params.uid; // the id of the user wanting ti create a new linksbook
    const { title, description } = req.body;

    let newLinksBook = new LinksBook({
        title: title,
        description: description,
        links: []
    });

    newLinksBook.save((err, linksbook) => {
        if (err) res.send({Error: err})


        User.find({ _id: userId }, (err, _user) => {
        // _user.linkBooks.push(linksbook._id);
        _user[0].linkBooks.push(linksbook._id);
            _user[0].save();
        });
        res.send(linksbook);
    });
});

app.post("/createlink/:lkid",  (req, res) => {
    const _linksbook = req.params.lkid;
    const { title, description, link } = req.body;

    let newLink = new Link({
        title: title,
        description: description,
        link: link
    });

    newLink.save((err, _link) => {
        if (err) res.send({Error: err})

        LinksBook.find({_id: _linksbook}, (err, linksbook_) => {
            _linksbook[0].link.push(_link); // add the link in the linksbook
            _linksbook[0].save(); // save the changes
        })

        res.send(_link);
    });
});

app.post("/signup",  (req, res) => {
    const { name, email, password } = req.body;

    let newUser = new User({
        name: name,
        email: email,
        password: password,
        linksbook: []
    });

    newUser.save((err, user_) => {
        if (err) res.send({Error: err})
        res.send(user_);
    });
});

app.get("/user/:uid", (req, res) => {
    User.find({_id: req.params.uid}, (err, u) => {
        res.send(u);
    });
});


app.listen(4000, () => console.log("Listening on port 4000"))