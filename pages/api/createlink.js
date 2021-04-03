// api function to create link

const mongoose = require("mongoose");

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);

const db = mongoose.connection;

const LinkSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String
});

// link model
const Link = mongoose.model("link", LinkSchema);

// link creation handler
const createLink = (req, res) => {
    const {title, link, description } = req.body;
    const newLink = new Link({
        title: title,
        link: link,
        description: description
    });

    newLink.save((err, _link) => {
        res.send(_link);
    });
};

module.exports = createLink