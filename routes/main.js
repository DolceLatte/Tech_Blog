var express = require('express');
var router = express.Router();

router.use((req,res,next)=>{ 
      res.locals.user = req.user
      next();
});
router.get('/',function(req,res){
      res.render('main', {
      });
 });

router.get('/Api',function(req,res){
      res.render('Api', {
      });
 });

module.exports = router;