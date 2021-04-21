//jshint esversion:6

//requiring all the node packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//using express
const app = express();

//Connecting mongoose to localhost:27017
mongoose.connect("mongodb://localhost:27017/booksDB", {useNewUrlParser:true, useUnifiedTopology:true});

//using ejs
app.set("view engine", 'ejs');

//using body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Creation of Schema
const bookSchema = {
    author: String,
    title: String,
    publisher: String,
    year: Number,
    link: String,
}

//Creation of model
const Book = mongoose.model("Book", bookSchema);

//                    REQUESTS TARGETING ALL BOOKS          //
app.route("/books")
.get(function(req, res) {
    Book.find(function(err, foundBooks) {
        if(!err) {
            res.send(foundBooks);
        }
        else {
            res.send(err);
        }
    })
})
.post(function(req, res) {
    const newBook = new Book({
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.publisher,
        linkURL: req.body.linkURL,
    });
    newBook.save(function(err) {
        if(!err) {
            res.send("Successfully added a new book in the db");
        }
        else {
            res.send(err);
        }
    })
});
// .delete(function(req, res) {
//     Book.deleteMany()
// })



//                                  REQUESTS TARGETING A SPECIFIC BOOK                      //
app.route("/book/:bookTitle")

.get(function(req, res) {
    Article.findOne({title: req.params.bookTitle}, function(err, foundBook)  {
        if(!err) {
            res.send(foundBook);
        }
        else 
        {
            console.log("No book found");
        }
    })
})

.put(function(req, res) {
    Article.updateOne(
        {title: req.params.bookTitle},
        {author: req.body.author, title: req.body.booktitle, publisher: req.body.publisher, year: req.body.year, link: req.body.link},
        {overwrite: true},
        function(err) {
            if(!err) {
                res.send("Successfully updates articles");
            }
        }
    )
})

.patch(function(req, res) {
    Book.updateOne(
        {title:req.body.bookTitle},
        {$set: req.body},
        function(err) {
            if(!err) {
                res.send("Successfully updates articles");
            }
        }

    )
});


app.listen(3000, function() {
    console.log("Server started at port 3000");
})