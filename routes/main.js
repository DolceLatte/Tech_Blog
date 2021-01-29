var express = require('express');
var router = express.Router();

router.use((req,res,next)=>{  
      res.locals.user = null;
      res.locals.followerCount = 0;
      res.locals.followerList = [];
      next();
});

router.get('/',function(req,res){
      res.render('main', {
      user : req.user
      });

 });

router.get('/techReview',function(req,res){
      res.render('techReview', {
      user : req.user
      });

 });

router.get('/Api',function(req,res){
      res.render('Api', {
      user : req.user
      });

 });

module.exports = router;
