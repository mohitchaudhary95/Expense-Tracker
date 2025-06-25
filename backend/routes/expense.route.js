const express=require('express');
const addExpense=require('../controllers/expense.controller.js')
const isAuthenticate=require('../middleware/isAuthenticated .js')

const router=express.Router();

router.route("/add").post(isAuthenticate,addExpense);

module.exports=router;