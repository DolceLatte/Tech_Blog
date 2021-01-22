var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var passport = require('passport');
var session = require('express-session');

var https = require('https');
var http = require('http');
var fs = require('fs');

const opt = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem'),
  hostname: 'localhost',
  port: '3000'
};

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret:'MySecret',resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/main.js'));
app.use('/techReview',require('./routes/techReview.js'));
app.use('/write',require('./routes/write.js'));
app.use('/auth',require('./routes/auth.js'));

var port = 3000;
// https.createServer(opt,app).listen(port,()=>{
// console.log("Express server has started on port 3000")
// });
app.listen(port,()=>{
  console.log("Express server has started on port 3000")
});
