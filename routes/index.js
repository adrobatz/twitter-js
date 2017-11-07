module.exports = function (io) {
    // ...
    // route definitions, etc.
    // ...
   

const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
//   next()
});
router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name: name, content: text})
    res.redirect('/');
  });
router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, name : name } )
  });

router.get('/tweets/:id', function(req, res) {
    var id = req.params.id;
    var tweetNum = tweetBank.find({id: id});
    res.render( 'index', { tweets: tweetNum } );
  });



// router.get('/', function (req, res, next) {
//     res.sendFile('public/stylesheets/style.css', function(err){
//     //     if(err) next(err)
//     //     else 
//     // });
//   });
return router;
};
