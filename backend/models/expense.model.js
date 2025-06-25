const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

const Expense=mongoose.model('Expense',userSchema);

module.exports=Expense;