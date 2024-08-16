const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

    image:{type:String,require:true},
    name:{type:String,required:true},
    userid:{type:String,required:true},
    status:{type:String,required:true},
    role:{type:String,required:true},
    email:{type:String,required:true},
    team:{type:String,required:true},
    dob:{type:String,required:true},
    gender:{type:String,required:true},
    nationality:{type:String,required:true},
    contact:{type:Number,required:true},
    wrkemail:{type:String,required:true},

});
const Users=mongoose.model('users',userSchema);
module.exports=Users; 