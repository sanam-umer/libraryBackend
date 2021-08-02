//Accessing Mongoose Package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://sanam:sanamummer@mycluster.jiqo9.mongodb.net/library?retryWrites=true&w=majority');

//Schema definition
const schema = mongoose.Schema;

const BookSchema = new schema({
    title: String,
    author: String,
    genre: String,
    image: String,
});

//Model creation
var bookData = mongoose.model('books',BookSchema);

module.exports = bookData;