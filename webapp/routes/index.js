var express = require('express');
var router = express.Router();
var network =require('../function/network');

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

router.use('/registercompany',function(req,res,next){
  network.registercompany('005','Google','@email','012331','US');
  res.send('dang ky tai khoan ngan hang');
});

router.use('/allworker',function(req,res,next){
  var returndata={};
  network.allworker().then((worker) =>{
    returndata.worker=worker;
    res.json(returndata);
  });
});

router.use('/allcompany',function(req,res,next){
  var returndata={};
  network.allcompany().then((company) =>{
    returndata.company=company;
    res.json(returndata);
  });
});
module.exports = router;
