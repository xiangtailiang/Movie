var model = require('../models')
var Movie = model.Movie
var Catetory=model.Catetory
//index
exports.index = function (req, res) {
   Catetory.find({})
    .populate({path:'movies',options:{limit:5}})
    .exec(function(err,catetories){
        if(err){
            console.log(err)
        }
        res.render('index', { title: 'Movie首页',catetories:catetories})
    })
}
//search
exports.search = function (req, res) {
    var catId = req.query.cat
    var page = parseInt(req.query.p,10)||0
    var count = 2
    var q=req.query.q
    var index = page * count
    if (catId) {
        Catetory.find({ _id: catId })
            .populate({ path: 'movies', select: 'title poster' })
            .exec(function (err, catetories) {
                if (err) {
                    console.log(err)
                }
                var catetory = catetories[0] || {}
                var movies = catetory.movies || []
                var results = movies.slice(index, index + count)
                res.render('results', {
                    title: '查询结果页面',
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    catetory: catetory,
                    keyword: catetory.name,
                    movies: results,
                    totalPage: Math.ceil(movies.length / count)
                })
            })
    }else{
        Movie
        .find({title:new RegExp(q+'.*','i')})
        .exec(function(err,movies){
             if (err) {
                    console.log(err)
                }
                var results = movies.slice(index, index + count)
                res.render('results', {
                    title: '查询结果页面',
                    currentPage: (page + 1),
                    query: 'q=' + catId,
                   
                    keyword: q,
                    movies: results,
                    totalPage: Math.ceil(movies.length / count)
                })
        })
    }
}