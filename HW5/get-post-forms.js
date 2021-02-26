var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/get-post-forms',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.queryDataList = qParams
  context.message = "GET Request Received";
  context.query = "Query";
  res.render('get-post-forms', context);
});

app.post('/get-post-forms', function(req,res){
  var qParams = [];
  var bParams = [];
  var context = {};
  if (req.query) {
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
    if (qParams.length != 0) {
      context.query = "query";
    }
  } 
  if (req.body) {
    for (var p in req.body){
      bParams.push({'name':p,'value':req.body[p]})
    }
    if (bParams.length != 0) {
      context.post = "POST";
    }
  }
  context.queryDataList = qParams;
  context.bodyDataList = bParams;
  context.message = "POST Request Received:";
  res.render('get-post-forms', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});