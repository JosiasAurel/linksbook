// import required depedencies
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
// mongodb+srv://linksbook:7Xy2vTSCB3gTazd@linksbook.kt3h9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongoose.connect("mongodb+srv://linksbook:7Xy2vTSCB3gTazd@linksbook.kt3h9.mongodb.net/linksbook?retryWrites=true&w=majority", options);
mongoose.connect("mongodb://localhost:27017/linksbook", options);


/* Models */
const db = mongoose.connection;

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/getlinks/:lkid",  (req, res) => {
    let linksbookId = req.params.lkid;
    
    Link.find({linkbook: linksbookId}, (err, links) => {
        if (err) res.send({Error: err})
        res.send(links)
    })
});


app.get("/getlinksbook/:userId",  (req, res) => {
    let uId = req.params.userId; // get user id from request param
    LinksBook.find({owner: uId}, (err, lks) => {
        if (err) res.send([]);
        res.send(lks);
    })
});


app.post("/createlinksbook/:uid",  (req, res) => {
    const uid = req.params.uid; // the id of the user wanting to create a new linksbook
    const { title, description } = req.body;

        LinksBook.find({owner: uid}, (err, lkb_) => {
            // fail safe
            if (err) res.json({Error: "Could not find linksbook count"});

            // check if load user
            User.findById(uid, (err, user) => {
                if (err) res.json({Error: "Could not find user"});

                // check if user is on starter plan
                if (user.plan === "Starter") {

                    // if on starter plan, check collections count
                    if (lkb_.length === 6) {
                        // if collections count === 6, do not create new collection
                        res.send("You have reached your Collections Limit");
                    } else {
                        // Otherwise
                        // create new links book
                        let newLinksBook = new LinksBook({
                            title: title,
                            description: description,
                            links: [],
                            owner: userId
                            });
                        // save new collection
                        newLinksBook.save((err, linksbook) => {
                            if (err) res.send({Error: err})
                            res.send(linksbook);
                            });
                    }
                } else {
                    // if the user is not on starter plan
                    // create new links book (collection)
                    let newLinksBook = new LinksBook({
                        title: title,
                        description: description,
                        links: [],
                        owner: userId
                        });
                        // save new collection
                        newLinksBook.save((err, linksbook) => {
                            if (err) res.send({Error: err})
                            res.send(linksbook);
                        });
                }
            })
    })
})


app.post("/createlink/:uid/:lkid",  (req, res) => {
    const uid = req.params.uid;
    const _linksbook = req.params.lkid;
    const { title, description, link } = req.body;

    User.findById(uid, (err, user) => {
        // check is user on starter plan
        if (user.plan === "Starter") {
            Link.find({linkbook: _linksbook}, (err, lks) => {
                // fail safe
                if (err) res.json({Error: err});
                // check the number of links in the db
                if (lks.length === 10) {
                    res.send("You have reached your limit of 10");
                } else {
                    // otherwise, just create new link
                    let newLink = new Link({
                        title: title,
                        description: description,
                        link: link,
                        linkbook: _linksbook
                    });
                    
                    newLink.save((err, _link) => {
                        if (err) res.json({Error: err})
                    
                        res.send(_link);
                    });
                }
            })
        } else {
            // if user os not on starter plan then is on pro plan
            let newLink = new Link({
                title: title,
                description: description,
                link: link,
                linkbook: _linksbook
            });
            
                newLink.save((err, _link) => {
            if (err) res.json({Error: err})
            
            res.send(_link);
            });
        }
    });
});

// todo
/* let newLink = new Link({
    title: title,
    description: description,
    link: link,
    linkbook: _linksbook
});

    newLink.save((err, _link) => {
if (err) res.json({Error: err})

res.send(_link);
} */

app.post("/signup",  (req, res) => {
    const { name, email, password } = req.body;

    let newUser = new User({
        name: name,
        email: email,
        password: password,
        linksbook: [],
        plan: "Starter"
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

module.exports = app;

app.listen(4000, () => console.log("Listening on port 4000"))