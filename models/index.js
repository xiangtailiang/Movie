var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/imooc',{server:{poolSize:20}},function(err){
    if(err){
        process.exit(1)
    }
})
require('./movie')
require('./user')
require('./Comment')
require('./Catetory')
exports.User=mongoose.model('User')
exports.Movie=mongoose.model('Movie')
exports.Comment=mongoose.model('Comment')
exports.Catetory=mongoose.model('Catetory')