var express = require('express');
var router = express.Router();
var network= require('../function/network');

/*POST call to register worker on the network */
router.post('/registerWorker', function(req, res, next) {
  var cardId    = req.body.password;
  var Id_worker = req.body.username;
  var name      = req.body.name;
  var birthday  = req.body.birthday;
  var email     = req.body.email;
  var phone     = req.body.phone;
  var address   = req.body.address;
  var skill     = req.body.skill;
  //console.log(req.post);
  network.registerWorker(cardId,Id_worker, name, birthday, email, phone, address, skill);
  //network.registerWorker('000003','100003', 'Le Van Hai', '01/01/1997', 'a@mail', '1121221', 'asdas', 'asdasd');
  res.send('Dang ky thanh cong');
});

/*POST call to register company on the network */
router.post('/registerCompany', function(req, res, next) {
  var cardId    = req.body.password;
  var Id_company = req.body.username;
  var name      = req.body.name;
  var email     = req.body.email;
  var phone     = req.body.phone;
  var address   = req.body.address;
  console.log(name);
  network.registerCompany(cardId,Id_company, name, email, phone, address);
  //network.registercompany('005','005','Google','@email','012331','US');
  res.send('Dang ky thanh cong');
});


module.exports = router;
