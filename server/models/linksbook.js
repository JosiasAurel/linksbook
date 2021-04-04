
const mongoose = require("mongoose");

// LinksBook Model
const LinksBookSchema = mongoose.Schema({
    title: String,
    description: String,
    link: Array
});

const LinksBook = mongoose.model("linksbook", LinksBookSchema);

module.exports = LinksBook;
