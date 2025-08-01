import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";

const CreateExpense = () => {
  const [input, setInput] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const dialogCloseRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setInput({ ...input, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { description, amount, category } = input;

    if (!description || !amount || !category) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/expense/add",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(addExpense(res.data.expense));
        setInput({ description: "", amount: "", category: "" });
        dialogCloseRef.current.click();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Expense</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Create expense here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="e.g. Pizza"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={input.amount}
              onChange={handleChange}
              placeholder="e.g. 500"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label>Category</Label>
            <Select
              value={input.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Party">Party</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" ref={dialogCloseRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
