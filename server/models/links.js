
const mongoose = require("mongoose");

// Link model
const LinkSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String
});

// link model
const Link = mongoose.model("link", LinkSchema);

module.exports = Link;