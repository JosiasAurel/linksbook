// api function to get links

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

// Link model
const LinkSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String
});

// link model
const Link = mongoose.model("link", LinkSchema);


const getLinks = (req, res) => {
    Link.find((err, links) => {
        if (err) res.json({ Error: err })
        res.json(links)
    })
};

module.exports = getLinks;
