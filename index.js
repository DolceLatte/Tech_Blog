var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var passport = require('passport');
var session = require('express-session');

var https = require('https');
var fs = require('fs');

const opt = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

app.set('view engine','ejs');
app.use(session({secret:'MySecret',resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/main.js'));
app.use('/auth',require('./routes/auth.js'));

var port = 3000;
https.createServer(opt,app).listen(port,()=>{
console.log("Express server has started on port 3000")
});
