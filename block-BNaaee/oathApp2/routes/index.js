var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', function (req, res, next) {
  res.render('success');
});

router.get('/failure', function (req, res, next) {
  res.render('failure');
});

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  (req, res) => {
    return res.redirect('/success');
  }
);

// passport google route

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    // Successful authentication, redirect home.
    return res.redirect('/success');
  }
);

module.exports = router;

// var express = require('express');
// const { session } = require('passport');
// var router = express.Router();

// var passport = require('passport');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.get("/success", (req, res, next)=>{
//   res.render("success")
// })

// router.get("/failure", (req, res, next)=>{
//   res.render("failure")
// })

// router.get("/auth/github", passport.authenticate('github'));

// router.get("/auth/github/callback", passport.authenticate('github', 
// {failureRedirect: '/failure'} ),
//  (req, res, next)=>{
//    res.redirect('/success')
// })


// module.exports = router;

