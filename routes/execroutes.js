const express = require("express");
const execRouter = express.Router();
const BookData = require('../src/model/Bookdata');
const AuthorData = require('../src/model/Authordata');

execRouter.delete('/deleteauthor/:id', (req, res) => {
    const id = req.params.id;
    AuthorData.findByIdAndRemove({ _id: id }, (err, authorData) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(authorData)
        }
    });
});



execRouter.delete('/deletbook/:id', (req, res) => {
    const id = req.params.id;
    BookData.findByIdAndRemove({ _id: id }, (err, bookData) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(bookData)
        }
    });
});


execRouter.post('/updateauthor/:id/submit', (req, res) => {
    const id = req.params.id;
    AuthorData.findById(id, (err, authorData) => {
        if (!authorData) {
            res.status(404).send("Record Not Found");
        } else {

            authorData.name = req.body.name,
                authorData.works = req.body.works,
                authorData.genre = req.body.genre,
                authorData.image = req.body.image

            authorData.save().then(authorData => {
                    console.log(authorData);

                })
                .catch(err => {
                    res.status(400).send("Unable to Update the Database");
                });
        }
    });
});



execRouter.post('/updatebook/:id', (req, res) => {
    const id = req.params.id;
    BookData.findById(id, (err, bookData) => {
        if (!bookData) {
            res.status(404).send("Record Not Found");
        } else {
            bookData.title = req.body.title,
                bookData.author = req.body.author,
                bookData.genre = req.body.genre,
                bookData.image = req.body.image

            bookData.save().then(bookData => {
                    console.log(bookData);

                })
                .catch(err => {
                    res.status(400).send("Unable to Update the Database");
                });
        }
    });
});

module.exports = execRouter;