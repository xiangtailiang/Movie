var express = require('express');
var router = express.Router();
var Index=require('../controllers/index')
var Movie=require('../controllers/movie')
var User=require('../controllers/user')
var Comment=require('../controllers/comment')
/* GET home page. */
//index
router.get('/', Index.index);
//movie
router.get('/movie/:id', Movie.detail);
router.post('/admin/movie/new',User.signRequired,User.adminRequired,Movie.new);
router.get('/admin/update/:id',User.signRequired,User.adminRequired,Movie.update);
router.get('/admin/movie',User.signRequired,User.adminRequired,Movie.list);
router.get('/admin/list',User.signRequired,User.adminRequired,Movie.save);
router.delete('/admin/list',User.signRequired,User.adminRequired,Movie.del);
//user
router.post('/user/signup',User.signup);
router.get('/admin/userlist', User.signRequired,User.adminRequired,User.list);
router.post('/user/signin',User.signin);
router.get('/logout',User.logout);
//comment
router.post('/admin/comment',User.signRequired,Comment.save);
module.exports = router;
