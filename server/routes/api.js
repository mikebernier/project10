const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = "mongodb://mike:1234@ds119820.mlab.com:19820/final";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  joke: String,
  answer: String
});

let post = mongoose.model('post', postSchema);

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
  if(err){
    console.log('Connection error');
  }
});

router.get('/posts', function (req, res) {
  console.log('Requesting post');
  post.find({})
      .exec(function (err, posts) {
        if(err){
          console.log("Error retriving posts");
        }
        else {
          res.json(posts);
        }
      })
});

router.get('/details/:id', function (req, res) {
  console.log('Requesting post');
  post.findById(req.params.id)
    .exec(function (err, post) {
      if(err){
        console.log("Error retriving posts");
      }
      else {
        res.json(post);
      }
    })
});

router.post('/posts', function (req, res) {
  console.log('Posting a post');
  let newPost = new post();
  newPost.joke = req.body.joke;
  newPost.answer = req.body.answer;
  newPost.save(function (err, addPost) {
    if(err){
      console.log('error posting');
    }
    else{
      res.json(addPost);
    }


  })

});

module.exports = router;
