var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
      res.render('write', {
      user : req.user
      });

 });

module.exports = router;
