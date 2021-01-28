var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : '3307',
  password : '1234',
});

connection.connect();

router.get('/',function(req,res){
      res.render('write', {
      user : req.user
      });

 });

 router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];


    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/techReview');
    });
});


module.exports = router;
