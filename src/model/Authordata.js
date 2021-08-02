const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://sanam:sanamummer@mycluster.jiqo9.mongodb.net/library?retryWrites=true&w=majority');
const Schema= mongoose.Schema;

const AuthorSchema =new Schema({
    name:String,
    works: String,
    genre: String,
    image: String,

});


var authorData = mongoose.model('authors',AuthorSchema);

module.exports = authorData;