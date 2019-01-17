var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/admin', function(req, res, next) {
  res.render('adminhome', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
  res.render('userhome', { title: 'Express' });
});

module.exports = router;
