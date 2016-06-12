var model = require('../models')
var Movie = model.Movie
var Comment = model.Comment
var Catetory = model.Catetory
var _ = require('underscore')
//detail
exports.detail = function (req, res) {
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        Comment
            .find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                res.render('detail', {
                    title: 'Movie详情页',
                    movie: movie,
                    comments: comments
                });
            })

    })
}
//new
exports.new = function (req, res) {
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) { console.log(err) }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else {
        _movie = new Movie(movieObj)
        var catetoryId = movieObj.catetory
        var catetoryName = movieObj.catetoryName
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            if (catetoryId) {
                Catetory.findById(catetoryId, function (err, catetory) {
                    catetory.movies.push(movie._id)
                    catetory.save(function (err, catetory) {
                        res.redirect('/movie/' + movie._id)
                    })
                })
            }
            else {
                var catetory = new Catetory({
                    name: catetoryName,
                    movies: [movie._id]
                })
                catetory.save(function (err, catetory) {
                    console.log(err)
                    movie.catetory=catetory._id
                    movie.save(function(err,movie){
                        res.redirect('/movie/' + movie._id)
                    })
                    
                })
            }
        })
    }
}
//update
exports.update = function (req, res) {
    var id = req.params.id

    if (id) {

        Movie.findById(id, function (err, movie) {
            Catetory.find({}, function (err, catetories) {
                res.render('admin', {
                    title: 'Movie后台更新页',
                    catetories: catetories,
                    movie: movie
                });
            })

        })
    }
}
//save
exports.save = function (req, res) {
    Catetory.find({},function(err,catetories){
          res.render('admin', {
        title: 'Movie后台录入页',
        catetories:catetories,
        movie: {}
    });
    })
}
//list
exports.list = function (req, res) {
    Movie.find({}, function (err, movies) {
        res.render('list', { title: 'Movie列表页', movies: movies });
    })
}
//del
exports.del = function (req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({ _id: id }, function (err, movie) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            }
            else {
                res.json({ success: 1 })
            }
        })
    }
}