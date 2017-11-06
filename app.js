const express = require( 'express' );
const app = express();  

app.use('/',function (req, res, next){
  console.log(req.method)
  next()
})

app.get('/', function(req, res){
    res.send('hello world')
})


app.listen(3000, () => console.log('im here'))