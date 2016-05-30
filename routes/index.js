var express = require('express');
var router = express.Router();
var Movie=require('../models/model')
var _=require('underscore')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie首页',movies:'movies' });
});

router.get('/movie/:id', function(req, res, next) {
  Movie.findById(id,function(err,movie){
    res.render('detail', { title: 'Movie详情页' 
  ,movie:movie});
  })
  
});
router.post('/admin/movie/new',function(req,res){
  var id=req.body.movie._id
  var movieObj=req.body.movie
  var _movie
  if(id!='undefined'){
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
router.get('/admin/update.:id',function(req,res){
  var id =req.params.id
  
})
router.get('/admin/movie', function(req, res, next) {
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
  res.render('admin', { title: 'Movie后台录入页' });
});

router.get('/admin/list', function(req, res) {
  
  res.render('list', { title: 'Movie列表页' });
});
module.exports = router;
