const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))



app.get('/quotes', function(req,res){
  db.collection('quotes').find().toArray((function(err,result){
    if(err) console.log(err)
    res.json(result)
  }))
})
app.get('/', function(req,res){
  // res.sendFile(__dirname + '/index.html')
  var cursor = db.collection('quotes').find()

  db.collection('quotes').find().toArray((function(err,result){
    if(err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  }))
})

app.post('/quotes', (req, res) => {
  console.log(req.body);

  db.collection('quotes').save(req.body, function (err, result){
    if(err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

MongoClient.connect('mongodb://localhost:27017/quotes',function (err, database){
  if(err) return console.log(err)

  db = database
  app.listen(3000, function(){
    console.log('May Node be with you');
    console.log('Escuchando puerto 3000');
  })
})
