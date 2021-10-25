const express = require("express");
const url = require("url");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/token", (req, res) => {
    const token = req.query.token;
    res.redirect(302, `/auth#authToken=${token}`);
});

module.exports = app;

app.listen(7000, () => console.log("Working..."));