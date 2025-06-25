const Expense = require('../models/expense.model.js');

const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields required",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });

    return res.status(201).json({
      message: "New Expense Added",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const userId = req.id;
    const category = req.query.category || "";
    const done = req.query.done || "";

    const query = { userId };

    if (category.toLowerCase() !== "all" && category !== "") {
      query.category = { $regex: category, $options: 'i' }; 
    }

    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }

    const expense = await Expense.find(query);

    if (!expense || expense.length === 0) {
      return res.status(404).json({
        message: "Expense Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { done } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { done },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense Not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Expense marked as ${expense.done ? "done" : "undone"}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json({
      message: "Expense Removed.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { description, category, amount } = req.body;
    const expenseId = req.params.id;
    const updatedData = { description, category, amount };

    const expense = await Expense.findByIdAndUpdate(expenseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      message: "Expense Updated.",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


module.exports = {
  addExpense,
  removeExpense,
  updateExpense,
  getAllExpense,
  markAsDoneOrUndone,
};
