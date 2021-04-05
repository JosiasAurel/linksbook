
const mongoose = require("mongoose");

// LinksBook Model
const LinksBookSchema = mongoose.Schema({
    title: String,
    description: String,
    links: [{type: mongoose.Schema.Types.ObjectId, ref: "links"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
});

const LinksBook = mongoose.model("linksbook", LinksBookSchema);

module.exports = LinksBook;
