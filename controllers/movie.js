var model = require('../models')
var Movie = model.Movie
var Comment=model.Comment
var _=require('underscore')
//detail
exports.detail = function (req, res) {
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        Comment
            .find({ movie: id })
            .populate('form', 'name')
            .exec(function (err, comments) {
                res.render('detail', {
                    title: 'Movie详情页',
                    movie: movie,
                    comments:comments
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
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            symmary: movieObj.symmary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
}
//update
exports.update = function (req, res) {
    var id = req.params.id
    console.log(id)
    if (id) {
        Movie.findById(id, function (err, movie) {
            console.log(movie)
            res.render('admin', {
                title: 'imooc'
                , movie: movie

            })
        })
    }
}
//save
exports.save = function (req, res) {
    res.render('admin', {
        title: 'Movie后台录入页',
        movie: {}
    });
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