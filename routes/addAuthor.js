const express = require('express');
const addAuthorRouter = express.Router();
const Authordata = require('../src/model/Authordata');


addAuthorRouter.post('/', (req, res) => {

    var author = {
       

        name: req.body.author.name,
        works: req.body.author.works,
        genre: req.body.author.genre,
        image: req.body.author.image

    }
    var author = Authordata(author)
    author.save((err, authorData) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(authorData)
        }
    });

});



module.exports = addAuthorRouter;