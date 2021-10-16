const express = require("express");

const app = express();

app.use(express.static("public"));

app.post("/api/red", (req, res) => {
    const { token } = req.body;
    res.redirect(`/auth#token=${token}`);
});

app.get("/api/:any", (req, res) => {
    res.send("Fine...");
});

module.exports = app;

app.listen(7000, () => console.log("Working..."));