const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
{
        googleId:{type:String},
        username:{type:String,required:true},
        email:{type: String, required:true},
        thumbnail:{type: String},
        password: { type:String },
        date: { type:Date, default: Date.now }
});

module.exports=mongoose.model('User',userSchema);
