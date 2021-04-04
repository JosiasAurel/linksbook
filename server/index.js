
// import required depedencies
const mongoose = require("mongoose");
const fastify = require("fastify");
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

/* const server = fastify({
    logger: true
}); */

// server.use(require("cors"));

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

app.post("/createlinksbook",  (req, res) => {
    const { title, description } = req.body;

    let newLinksBook = new LinksBook({
        title: title,
        description: description,
        links: []
    });

    newLinksBook.save((err, linksbook) => {
        if (err) res.send({Error: err})
        res.send(linksbook);
    });
});

app.post("/createlink",  (req, res) => {
    const { title, description, link } = req.body;

    let newLink = new Link({
        title: title,
        description: description,
        link: link
    });

    newLink.save((err, _link) => {
        if (err) res.send({Error: err})
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

/* const start = () => {
    try {
         server.listen(4000);
    } catch(err) {
        server.log.error(err);
        process.exit(1);
    }
};

start(); */

app.listen(4000, () => console.log("Listening on port 4000"))