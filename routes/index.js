var express = require('express');
var router = express.Router();
var model=require('../models/model')
var Movie=model.Movie
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
    res.render('detail', { title: 'Movie详情页' +movie.title
  ,movie:movie});
  })
  
});
router.post('/admin/movie/new',function(req,res){
  var id=req.body.movie._id
  var movieObj=req.body.movie
  var _movie
  if(id !=='undefined'){
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
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'imooc'
        ,movie:movie
      })
    })
  }
})
router.get('/admin/movie', function(req, res) {
  res.render('admin', { title: 'Movie后台录入页',
          movie:{title:'',
         doctor:'',
        country:'',
        year:'',
        poster:'',
        flash:'',
        summary:'',
        language:''} });
});

router.get('/admin/list', function(req, res) {
  Movie.find({},function(err,movies){
    res.render('list', { title: 'Movie列表页',movies:movies});
  })
});
router.delete('/admin/list',function(req,res){
  var id =req.query.id
  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.log(err)
      }
      else{
        res.json({sucess:1})
      }
    })
  }
})
module.exports = router;
