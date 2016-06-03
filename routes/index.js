var express = require('express');
var router = express.Router();
var model=require('../models')
var Movie=model.Movie
var User=model.User
var _=require('underscore')
/* GET home page. */
router.get('/', function(req, res) {
  Movie.fetch(function(err,movies){
    if(err){console.log(err)}
    res.render('index', { title: 'Movie首页',movies:movies });
  })
  
});

router.get('/movie/:id', function(req, res) {
  var id=req.params.id
  Movie.findById(id,function(err,movie){
    res.render('detail', { title: 'Movie详情页' 
  ,movie:movie});
  })
  
});
router.post('/admin/movie/new',function(req,res){
  var id=req.body.movie._id
  var movieObj=req.body.movie
  var _movie
  if(id){
    Movie.findById(id,function(err,movie){
      if(err){console.log(err)}
      _movie=_.extend(movie,movieObj)
      _movie.save(function(err,movie){
        if(err){
          console.log(err) 
        }
        res.redirect('/movie/'+movie._id)
      })
      
    })
  }
  else{
    _movie=new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      symmary:movieObj.symmary,
      flash:movieObj.flash
    })
     _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/'+movie._id)
      })
      
  }
  
})
router.get('/admin/update/:id',function(req,res){
  var id =req.params.id
  console.log(id)
  if(id){
    Movie.findById(id,function(err,movie){
      console.log(movie)
      res.render('admin',{
        title:'imooc'
        ,movie:movie
        
      })
    })
  }
})
router.get('/admin/movie', function(req, res) {
  res.render('admin', { title: 'Movie后台录入页',
          movie:{} });
});

router.get('/admin/list', function(req, res) {
  Movie.find({},function(err,movies){
    res.render('list', { title: 'Movie列表页',movies:movies});
  })
});
router.delete('/admin/list', function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
})
router.post('/user/signup',function(req,res){
  var _user=req.body.user
 
  User.findOne({name:_user.name},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
       return res.redirect('/')
    }
    else{
       user=new User(_user)
       user.save(function(err,user){
       if(err){
      console.log(err)
      }
      res.redirect('/')
  })
    }
  })
 
})

router.get('/admin/userlist', function(req, res) {
  User.find({},function(err,users){
    res.render('userlist', { title: '用户列表页',users:users});
  })
});
module.exports = router;
