const Expense=require('../models/expense.model.js');

const addExpence=async (req,res)=>{
    try{
        const {description,amount,category}=req.body;
        const userId=req.id;
        if(!description || !amount || !category){
            return res.status(400).json({
                message:"All fields required",
                success:false
            })
        };
        
        const expense= await Expense.create({
            description,
            amount,
            category,
            userId
        });
        return res.status(400).json({
            message:"New Expense Added",
            expense,
            success:true
        })

    }
    catch(error){
        console.log(error)
    }
}

const getAllEcxpense=async (req,res)=>{
    const userId=req.id;
    let category=req.query.category || "";
    const done= req.query.done || "";

    const query={
        userId
    }
    if(category.toLowercase()==="all"){
        //no need to filter by category
    }
    else{
        qyery.category={$Regex:category,$option:'i'}
    }
    if(done.toLowercase()==="done"){
        query.done=true;

    }
    else if(done.toLowercase()==="Undone"){
        query.done=false;

    }

    const expense =await Expense.find(query);
    if(!expense || expense.length===0){
        res.status(404).json({
            messsage:"Expense Not Found",
            success:false
        })
    };
    return res.status(200).json({
        expense,
        success:true
    })
}

module.exports = addExpence;