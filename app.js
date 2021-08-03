const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var app = new express();
const port = process.env.PORT || 3000;

const bookData = require('./src/model/Bookdata');
const authorData = require('./src/model/Authordata');
// const userData = require('./src/model/Signupdata');

app.use(cors());
var bodyparser = require('body-parser');
const { eventNames } = require('./src/model/Bookdata');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyparser.json());
username='admin';
password='1234';

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }



app.get('/',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.send('Backend Successfull');
});

app.post('/login', (req, res) => {
    let userData = req.body
    
      
        if (!username) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })



app.post('/addbook',function(req,res){
   
    console.log(req.body);
   var item={ 
    
    title: req.body.book.title,
    author: req.body.book.author,
    genre: req.body.book.genre,
    image: req.body.book.image
 }

var book= new bookData(item);
book.save();//save to database
});


app.put('/update-book',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
   
    title=req.body.title,
    author= req.body.author,
    genre= req.body.genre,
    image= req.body.image
   bookData.findByIdAndUpdate({"_id":id},
                                {$set:{
                              
                                "title":title,
                                "author":author,
                                "genre":genre,
                                "imag":image}})
   .then(function(){
       res.send();
   })
 })

app.get('/books',function(req,res){
    
    bookData.find()
                .then(function(books){
                    res.send(books);
                });
});


app.get('/book/:id',  (req, res) => {
  
    const id = req.params.id;
      bookData.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })

  app.delete('/deletebook/:id',(req,res)=>{
    const id=req.params.id;
    bookData.findByIdAndDelete({'_id':id})
    .then(function(){
        console.log('Book Deleted');
        alert('Book Deleted')
        res.send();
    });
})
app.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    bookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        alert('success')
        res.send();
    })
  })
app.get('/authors',function(req,res){
    
  authorData.find()
              .then(function(authors){
                  res.send(authors);
              });
});




app.post('/addauthor',function(req,res){
var item={
  
  name: req.body.author.name,
  works: req.body.author.works,
  genre: req.body.author.genre,
  image: req.body.author.image
}

var author=authorData(item);
author.save();//save to database
});

app.get('/author/:id',  (req, res) => {
  
  const id = req.params.id;

    authorData.findOne({"_id":id})
    .then((author)=>{
        res.send(author);
    });
})


app.put('/update-author',(req,res)=>{
  console.log(req.body)
  id=req.body._id,
  
  name= req.body.name,
  works= req.body.works,
  genre= req.body.genre,
  image= req.body.image
 authorData.findByIdAndUpdate({"_id":id},
                              {$set:{
                               
                              "name":name,
                              "works":works,
                              "genre":genre,
                              "image":image}})
 .then(function(){
     res.send();
 })
})
 

app.delete('/deleteauthor/:id',(req,res)=>{
    const id=req.params.id;
    authorData.findByIdAndDelete({'_id':id})
    .then(function(){
        console.log('Book Deleted');
        alert('Author Deleted')
        res.send();
    });
})
app.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    authorData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

//Port Configuration

app.listen(port,()=>{console.log("server ready at" + port)});