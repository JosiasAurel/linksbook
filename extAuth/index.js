const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/token", (req, res) => {
    const token = req.query.token;
    res.redirect(302, `/auth#authToken=${token}`);
});

module.exports = app;

app.listen(7000, () => console.log("Working..."));