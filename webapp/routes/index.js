var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/login',function(req,res,next){
  res.render('home');
});

router.use('/signup/company',function(req,res,next){
  res.render('signupcompany');
});

router.use('/signup/worker',function(req,res,next){
  res.render('signupworker');
});
module.exports = router;
