var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer')
var path = require('path')

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const {sequelize ,  Post, Hashtag} = require('../models')

sequelize.sync({force : false})
  .then(()=>{
    console.log('DB connect');;
  })
  .catch((err)=>{
    console.error(err);
  });

router.get('/',function(req,res){
      res.render('write', {
      user : req.user
      });
 });

 try {
      fs.readdirSync('uploads');
    } catch (error) {
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
      }
    
const upload = multer({
storage: multer.diskStorage({
      destination(req, file, cb) {
      cb(null, 'uploads/');
      },
      filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
}),
limits: { fileSize: 5 * 1024 * 1024 },
});

// router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
// console.log(req.file);
// res.json({ url: `/img/${req.file.filename}` });
// });
    
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
try {
      const post = await Post.create({
      title : req.body.title,
      content: req.body.content,
      img: req.body.url,
      });

      const hashtags = req.body.content.match(/#[^\s#]*/g);
      if (hashtags) {
      const result = await Promise.all(
      hashtags.map(tag => {
            return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
            })
      }),
      );
      await post.addHashtags(result.map(r => r[0]));
      }
      res.redirect('/');
} catch (error) {
      console.error(error);
      next(error);
}
});

module.exports = router;
