var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/imooc',{server:{poolSize:20}},function(err){
    if(err){
        process.exit(1)
    }
})
require('./movie')
require('./user')

exports.User=mongoose.model('User')
exports.Movie=mongoose.model('Movie')