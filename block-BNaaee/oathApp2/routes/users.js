  
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {
  console.log(req.session, req.user);
  res.send('respond with a resource');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  req.user = null;
  res.clearCookie('connect.sid');
  res.redirect('/');
  //logout done
});

module.exports = router;
