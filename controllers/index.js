var model = require('../models')
var Movie = model.Movie
//index
exports.index = function (req, res) {
   
    Movie.fetch(function (err, movies) {
        if (err) { console.log(err) }
        res.render('index', { title: 'Movie首页', movie: movie});
    })
}