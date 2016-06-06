var model = require('../models')
var User = model.User
//signup
exports.signup = function (req, res) {
    var _user = req.body.user
    User.findOne({ name: _user.name }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            return res.redirect('/')
        }
        else {
            user = new User(_user)
            user.save(function (err, user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })
}
//signin
exports.signin = function (req, res) {
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({ name: name }, function (err, user) {
        if (err) { console.log(err) }
        if (!user) { return res.redirect('/') }
        user.comparePassword(password, function (err, isMatch) {
            if (err) { console.log(err) }
            if (isMatch) {
                req.session.user = user
                return res.redirect('/')
            }
            else (console.log('not match'))
        })
    })
}
//logout
exports.logout = function (req, res) {
    delete req.session.user
    res.redirect('/')
}
//list
exports.list = function (req, res) {
    User.find({}, function (err, users) {
        res.render('userlist', { title: '用户列表页', users: users });
    })
}
//middlewares
//signin
exports.signRequired = function (req, res,next) {
    var user=req.session.user
    if(!user){
        return res.redirect('/')
    }
    next()
}
//admin
exports.adminRequired = function (req, res,next) {
    var user=req.session.user
    if(user.role<=10){
        return res.redirect('/')
    }
    next()
}