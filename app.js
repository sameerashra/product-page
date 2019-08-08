var express=require('express');
var viewController=require('./controller/controller');
var app=express();

app.set('view engine','ejs');
app.use(express.static('./public'));

viewController(app);

app.listen('3000');
console.log('server is running');