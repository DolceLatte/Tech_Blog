var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
      res.render('techReview', {
      user : req.user
      });

 });

module.exports = router;
