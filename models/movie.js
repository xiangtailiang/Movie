var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    conutry:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    catetory:{type:ObjectId,ref:'Catetory'},
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
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()}
        next()
})
MovieSchema.statics={
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
mongoose.model('Movie',MovieSchema)