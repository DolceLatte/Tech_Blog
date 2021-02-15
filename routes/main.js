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

 router.get('/', async (req, res, next) => {
      try {
        const posts = await Post.findAll({
          include: {
            model: User,
            attributes: ['id', 'nick'],
          },
          order: [['createdAt', 'DESC']],
        });
        res.render('main', {
          title: 'NodeBird',
          twits: posts,
        });
      } catch (err) {
        console.error(err);
        next(err);
      }
    });

module.exports = router;
