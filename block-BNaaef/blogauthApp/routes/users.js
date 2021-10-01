var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var path = require('path');

var uploadPath = path.join(__dirname, '../', 'public/uploads');
// Strorage for Uploaded Files

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

/* GET users listing. */

router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('users');
});

router.get('/dashboard', (req, res, next) => {
  console.log(req.session);
  User.findOne({ _id: req.session.userId }, (err, user) => {
    if (err) return next(err);
    res.render('dashboard', { user });
  });
});

router.get('/register', function (req, res, next) {
  res.render('register', { error: req.flash('error')[0] });
});

router.post('/register', upload.single('profilePic'), (req, res, next) => {
  req.body.profilePic = req.file.filename;
  User.create(req.body, (err, user) => {
    console.log(err, user);
    if (err) {
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/users/register');
      }
      req.flash('error', 'This email is taken');
      return res.redirect('/users/register');
      // return res.json({ err });
    }

    res.redirect('/users/login');
  });
});

router.get('/login', (req, res, next) => {
  var error = req.flash('error')[0];
  res.render('login', { error });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    // no user
    if (!user) {
      req.flash('error', 'This email is not registered');
      return res.redirect('/users/login');
    }
    // compare password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/users/login');
      }
      // persist login user info
      req.session.userId = user.id;
      res.redirect(req.session.returnTo || '/users/dashboard');
      delete req.session.returnTo;
      // res.redirect('/users/dashboard');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
