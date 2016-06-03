var mongoose=require('mongoose')

var bcrypt=require('bcryptjs')
var UserSchema = new mongoose.Schema({
    name: {
    unique: true,
    type: String
  },
  password: String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            dafault:Date.now()
        }
    }
})
UserSchema.pre('save',function(next){
    var user=this
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()
    }
    bcrypt.genSalt(10,function(err,salt){
        if(err) {return next(err)}
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){return next(err)}
            user.password =hash
            next()
        })
    })
})
UserSchema.statics={
    fetch:function(cb){
        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)
    },
    findById:function(id,cb){
        return this.findOne({_id:id})
        .exec  (cb)
    }
}
mongoose.model('User',UserSchema)