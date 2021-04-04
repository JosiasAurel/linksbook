
// import required depedencies
const mongoose = require("mongoose");
const fastify = require("fastify");

// load database schema
const Link = require("./models/links");
const User = require("./models/user");
const LinksBook = require("./models/linksbook");

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
const db = mongoose.connection;

const server = fastify({
    logger: true
});

server.get("/getlinks", async (req, res) => {
    Link.find((err, links) => {
        if (err) res.send({Error: err})
        res.send(links);
    })
});

server.get("/getlinksbook", async (req, res) => {
    LinksBook.find((err, linksbooks) => {
        if (err) res.send({Error: err})
        res.send(linksbooks);
    });
});

server.post("/createlinksbook", async (req, res) => {
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

server.post("/createlink", async (req, res) => {
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