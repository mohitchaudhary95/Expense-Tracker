const express = require('express');
const {
  addExpense,
  getAllExpense,
  removeExpense,
  updateExpense,
  markAsDoneOrUndone
} = require('../controllers/expense.controller.js');
const isAuthenticate = require('../middleware/isAuthenticated.js');

const router = express.Router();

router.post("/add", isAuthenticate, addExpense);
router.get("/getAll", isAuthenticate, getAllExpense);
router.delete("/remove/:id", isAuthenticate, removeExpense);
router.put("/update/:id", isAuthenticate, updateExpense);
router.put("/:id/done", isAuthenticate, markAsDoneOrUndone);

module.exports = router;
