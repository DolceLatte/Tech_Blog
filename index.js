var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var passport = require('passport');
const session = require('express-session');


const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

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
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  secret:'MySecret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    secure:false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/main.js'));
app.use('/write',require('./routes/write.js'));
app.use('/auth',require('./routes/auth.js'));

app.use((req,res,next)=>{
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err,req,res,next)=>{
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


var port = 3000;
// https.createServer(opt,app).listen(port,()=>{
// console.log("Express server has started on port 3000")
// });
app.listen(port,()=>{
  console.log("Express server has started on port 3000")
});
