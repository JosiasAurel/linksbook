// api function to create link

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
    link: Array
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

// link creation handler
const createLink = (req, res) => {
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
};

module.exports = createLink