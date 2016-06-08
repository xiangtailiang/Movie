var model = require('../models')
var Catetory= model.Catetory
var _=require('underscore')
//new
exports.new = function (req, res) {
        res.render('newCatetory',{
            title:'后台分类列表',
            catetory:{}
        })
}
//save
exports.save = function (req, res) {
    var _catetory = req.body.catetory
    var catetory=new Catetory(_catetory)
        catetory.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/admin/catetorylist')
        })
    }
//list
exports.list = function (req, res) {
    Catetory.find({}, function (err, catetories) {
        res.render('Catetorylist', { title: '用户列表页', catetories: catetories });
    })
}