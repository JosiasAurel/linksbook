
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
mongoose.connect("mongodb+srv://linksbook:7Xy2vTSCB3gTazd@linksbook.kt3h9.mongodb.net/linksbook?authSource=admin&replicaSet=atlas-dpalhd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", options);


/* Models */
const db = mongoose.connection;

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/getlinks/:lkid",  (req, res) => {
    let linksbookId = req.params.lkid;
    
    Link.find({linkbook: linksbookId}, (err, links) => {
        if (err) res.send({Error: err})
        res.send(links)
    })
});


app.get("/getlinksbook/:userId",  (req, res) => {
    let uId = req.params.userId; // get user id from request param
    LinksBook.find({owner: uId}, (err, lks) => {
        res.send(lks);
    })
});

app.get("/getlinksbook/:id", (req, res) => {
    let lkId = req.params.id;

    LinksBook.findById(lkId, (err, lk) => {
        if (err) res.json({Error: err});
        res.send(lk);
    })
})

app.post("/createlinksbook/:uid",  (req, res) => {
    const userId = req.params.uid; // the id of the user wanting to create a new linksbook
    const { title, description } = req.body;

    let newLinksBook = new LinksBook({
        title: title,
        description: description,
        links: [],
        owner: userId
    });

    newLinksBook.save((err, linksbook) => {
        if (err) res.send({Error: err})
        res.send(linksbook);
    });
});

app.post("/createlink/:lkid",  (req, res) => {
    const _linksbook = req.params.lkid;
    const { title, description, link } = req.body;

    let newLink = new Link({
        title: title,
        description: description,
        link: link,
        linkbook: _linksbook
    });

    newLink.save((err, _link) => {
        if (err) res.json({Error: err})

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

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    User.find({email: email}, (err, u) => {
        if (err) res.json({Error: err});
        res.send(u);
    });
});

module.exports = app;

app.listen(4000, () => console.log("Listening on port 4000"))