
// import required depedencies
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// load database schema
const Link = require("./models/links");
const User = require("./models/user");
const LinksBook = require("./models/linksbook");

// load environment variables
require("dotenv").config();

// db config
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to the database
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
const db = mongoose.connection;


app.get("/getlinks/:lkid",  (req, res) => {
    let linksbookId = req.params.lkid;
    
    LinksBook.findById(linksbookId, (err, linksbook) => {
        res.send(linksbook.link);
    });
});


app.get("/getlinksbookid/:userId",  (req, res) => {
    let uId = req.params.userId; // get user id from request param
    let finalLinkBooks = [];

    /* User.findById(uId, (err, user) => {
        if (err) res.send({Error: err});
        let userLinkBooks = user.linkBooks;

            userLinkBooks.forEach(linkbook => {
            // fetch for linkbook matching id
            LinksBook.findById(linkbook).exec((err, lk) => {
                finalLinkBooks.push(lk);
            });
        });
    }); */
    async function getLinksBook() {
            let finalLinkBooks = [];
            let user_lk = await User.findById(uId);
            let user_lks = user_lk.linkBooks;
            res.send(user_lks);

            let result = await user_lks.map(async (lk) => await LinksBook.findById(lk));
            //res.send(result);
        }

    getLinksBook();
});

app.get("/getlinksbook/:id", (req, res) => {
    let lkId = req.params.id;

    LinksBook.findById(lkId, (err, lk) => {
        if (err) res.json({Error: err});
        res.send(lk);
    })
})

app.post("/createlinksbook/:uid",  (req, res) => {
    const userId = req.params.uid; // the id of the user wanting to create a new linksbook
    const { title, description } = req.body;

    let newLinksBook = new LinksBook({
        title: title,
        description: description,
        links: []
    });

    newLinksBook.save((err, linksbook) => {
        if (err) res.send({Error: err})


        User.find({ _id: userId }, (err, _user) => {
        // _user.linkBooks.push(linksbook._id);
        _user[0].linkBooks.push(linksbook._id);
            _user[0].save();
        });
        res.send(linksbook);
    });
});

app.post("/createlink/:lkid",  (req, res) => {
    const _linksbook = req.params.lkid;
    const { title, description, link } = req.body;

    let newLink = new Link({
        title: title,
        description: description,
        link: link
    });

    newLink.save((err, _link) => {
        if (err) res.json({Error: err})

        LinksBook.find({_id: _linksbook}, (err, linksbook_) => {
            linksbook_[0].link.push(_link._id); // add the link in the linksbook
            linksbook_[0].save(); // save the changes
        })

        res.send(_link);
    });
});

app.post("/signup",  (req, res) => {
    const { name, email, password } = req.body;

    let newUser = new User({
        name: name,
        email: email,
        password: password,
        linksbook: []
    });

    newUser.save((err, user_) => {
        if (err) res.send({Error: err})
        res.send(user_);
    });
});

app.get("/user/:uid", (req, res) => {
    User.find({_id: req.params.uid}, (err, u) => {
        res.send(u);
    });
});

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    User.find({email: email}, (err, u) => {
        if (err) res.json({Error: err});
        res.send(u);
    });
});


app.listen(4000, () => console.log("Listening on port 4000"))