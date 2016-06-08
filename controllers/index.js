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