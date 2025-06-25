const express=require('express');
const {addExpense,getAllExpense,removeExpense,updateExpense,markAsDoneOrUndone}=require('../controllers/expense.controller.js')
const isAuthenticate=require('../middleware/isAuthenticated .js')

const router=express.Router();

router.route("/add").post(isAuthenticate,addExpense);
router.route("/getAll").get(isAuthenticate,getAllExpense);
router.route("/remove/:id").delete(isAuthenticate,removeExpense)
router.route("/update/:id").put(isAuthenticate,updateExpense);
router.route("/:id/done").put(isAuthenticate,markAsDoneOrUndone);

module.exports=router;