
const morgan = require('morgan')
const express = require( 'express' );
const nunjucks = require( 'nunjucks' )
const bodyParser = require('body-parser')
const app = express();  
var socketio = require('socket.io');

var server = app.listen(3000, () => console.log('im here'))
var io = socketio.listen(server);

const routes = require('./routes');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', routes(io));
app.use(express.static('public'))

app.use('/',function (req, res, next){
  console.log(req.method)
  next()
})

nunjucks.configure('views', {
    express : app,
})

app.set('view engine', 'html')


// app.get('/views/index.html', function(req, res){
//     res.render('index.html', {
//         title: 'An Example',
//         people: [{name: 'Gandalph'}, {name: 'Frodo'}, {name: 'Hermione'}]
//         // return res.send('index.html')
//     })
// })

// app.get('/', function(req, res){
//     res.send('hello world')
// })



