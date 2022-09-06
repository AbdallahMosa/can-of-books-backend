'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;
const seedData=require('./book');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB
mongoose.connect('mongodb://abdallah:0000@ac-1odpauc-shard-00-00.acyygth.mongodb.net:27017,ac-1odpauc-shard-00-01.acyygth.mongodb.net:27017,ac-1odpauc-shard-00-02.acyygth.mongodb.net:27017/?ssl=true&replicaSet=atlas-mp85cf-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB


const BookSchema = new mongoose.Schema({
  title: String,
  description : String,
  status : String
});
const Book = mongoose.model('Book', BookSchema);
function booksHandler (request, response){
  Book.find({},(err,result)=>{
      if(undefined)
      {
          console.log(err);
      }
      else
      {
          console.log(result);
          response.send(result);
      }
  })
 }
async function addBooksHandler(request,response) {
  console.log(request.body);
  const {title,description,status} = request.body; //Destructuring assignment
  await Book.create({
      title : title,
      description : description,
      status : status
  });
  Book.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          console.log(result);
          response.send(result);
      }
  })
}
function deleteBookHandler(req,res) {
  const bookId = req.params.id;
  Book.deleteOne({_id:bookId},(err,result)=>{
    Book.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })
  })
}
function updateBook(req,res){
  console.log("hi update")
  const id = req.params.id;
  console.log(id)
  const {title,description,status} = req.body; //Destructuring assignment
  console.log(req.body);
  Book.findByIdAndUpdate(id,{title,description,status},(err,result)=>{
      if(err) {
          console.log(err);
      }
      else {
          Book.find({},(err,result)=>{
              if(err)
              {
                  console.log(err);
              }
              else
              {
                  // console.log(result);
                  res.send(result);
              }
          })
      }
  })

}

// seedData();
app.get('/', (request, response) => {
  response.send('Home')
})
// http://localhost:3000/books
app.get('/books',booksHandler)
app.post('/books',addBooksHandler)
//delete
app.delete('/deleteBook/:id',deleteBookHandler);
// app.put('/book/:id', updateBook)
app.put('/book/:id',updateBook);

app.get('/test', (request, response) => {
  response.send('test request received')
})
app.listen(PORT, () => console.log(`listening on ${PORT}`));