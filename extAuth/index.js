const express = require("express");

const app = express();

app.use(express.static("client"));

app.get("/", (req, res) => {
    res.sendFile(__dirname, "./client/index.html");
});

app.post("/red", (req, res) => {
    const { token } = req.body;
    res.redirect(`/auth#token=${token}`);
});

app.get("/:any", (req, res) => {
    res.send("Fine...");
});

module.exports = app;

app.listen(7000, () => console.log("Working..."));