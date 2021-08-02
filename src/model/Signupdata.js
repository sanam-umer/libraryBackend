const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanam:sanamummer@mycluster.jiqo9.mongodb.net/library?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    username : String,
    username1 : String,
    email : String,
    password1 : String
});


var userData = mongoose.model('userdatas',UserSchema);

module.exports = userData;