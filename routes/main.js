var express = require('express');
var router = express.Router();

router.use((req,res,next)=>{  
      res.locals.user = null;
      res.locals.followerCount = 0;
      res.locals.followerList = [];
      res.locals.user = req.user
      next();
});

router.get('/',function(req,res){
      res.render('main', {
      
      });

 });

router.get('/techReview',function(req,res){
      res.render('techReview', {
      
      });

 });

router.get('/Api',function(req,res){
      res.render('Api', {
      
      });

 });

module.exports = router;
