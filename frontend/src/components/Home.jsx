import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  toggleExpenseStatus,
  setFilterCategory,
  toggleShowDone,
  toggleShowUndone,
} from "../redux/expenseSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import axios from "axios";
import { toast } from "sonner"; // ✅ use sonner

const Home = () => {
  const dispatch = useDispatch();
  const { expenses, filterCategory, showDone, showUndone } = useSelector(
    (state) => state.expense
  );
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "" });

  const fetchExpenses = async () => {
    try {
      let query = `http://localhost:8000/api/v1/expense/getAll`;

      const params = [];
      if (filterCategory && filterCategory !== "all") {
        params.push(`category=${filterCategory}`);
      }
      if (showDone) params.push("done=done");
      if (showUndone) params.push("done=undone");

      if (params.length) query += "?" + params.join("&");

      const res = await axios.get(query, { withCredentials: true });
      dispatch(setExpenses(res.data.expense));
    } catch (err) {
      toast.error("Failed to fetch expenses");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filterCategory, showDone, showUndone]);

  const handleToggleStatus = async (exp) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/expense/${exp._id}/done`,
        { done: !exp.done },
        { withCredentials: true }
      );
      dispatch(toggleExpenseStatus(exp._id));
      toast.success(`Marked as ${!exp.done ? "done" : "undone"}`);
    } catch (err) {
      toast.error("Failed to toggle status");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this expense?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/expense/remove/${id}`, {
        withCredentials: true,
      });
      dispatch(setExpenses(expenses.filter((e) => e._id !== id)));
      toast.success("Expense deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (id) => {
    const title = editForm.title?.toString().trim();
    const amount = editForm.amount?.toString().trim();

    if (!title || !amount) {
      toast.error("Title and amount are required");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/update/${id}`,
        { title, amount },
        { withCredentials: true }
      );
      const updatedExpense = res.data.updatedExpense;
      dispatch(
        setExpenses(expenses.map((e) => (e._id === id ? updatedExpense : e)))
      );
      toast.success("Expense updated");
      setEditingId(null);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
        <CreateExpense />

        {/* Filters */}
        <div className="flex items-center gap-4 my-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">Filter by Category:</span>
            <Select
              value={filterCategory}
              onValueChange={(value) => dispatch(setFilterCategory(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={() => dispatch(toggleShowDone())}
            className={`px-4 py-1 rounded-full border ${
              showDone ? "bg-green-100" : "bg-white"
            }`}
          >
            Show Done
          </button>
          <button
            onClick={() => dispatch(toggleShowUndone())}
            className={`px-4 py-1 rounded-full border ${
              showUndone ? "bg-yellow-100" : "bg-white"
            }`}
          >
            Show Undone
          </button>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.length === 0 && (
            <p className="text-gray-500">No expenses found.</p>
          )}

          {expenses.map((exp) => (
            <div
              key={exp._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
            >
              {editingId === exp._id ? (
                <div className="flex-1 flex gap-3">
                  <input
                    className="border px-2 py-1 rounded"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    type="number"
                  />
                  <button
                    onClick={() => handleUpdate(exp._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex-1">
                  <h2 className="font-medium text-lg">
                    {exp.title} — ₹{exp.amount}
                  </h2>
                  <p className="text-sm text-gray-600 capitalize">
                    {exp.category} | {exp.done ? "Done" : "Pending"}
                  </p>
                </div>
              )}

              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => handleToggleStatus(exp)}
                  className="text-sm px-3 py-1 border rounded text-green-600"
                >
                  {exp.done ? "Undo" : "Mark Done"}
                </button>
                <button
                  onClick={() => {
                    setEditingId(exp._id);
                    setEditForm({ title: exp.title, amount: exp.amount });
                  }}
                  className="text-sm px-3 py-1 border rounded text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-sm px-3 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
