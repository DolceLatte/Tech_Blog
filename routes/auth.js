var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');

router.get('/login',function(req,res){
      res.render('auth/login', {
            title: "MY HOMEPAGE",
           length: 5
      });
 });

router.get('/logout',function(req,res){
      req.logout();
      res.redirect('/');
 });

router.get('/google', passport.authenticate('google',{scope:['profile']})
 );

router.get('/google/callback', passport.authenticate('google'),authSuccess
);

function authSuccess(req,res){
	res.redirect('/');
}

module.exports = router;