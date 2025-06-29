import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import ExpenseTable from "./ExpenseTable";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import useGetExpenses from "@/hooks/useGetExpenses";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Expenses</h1>
        <CreateExpense />
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-8 mb-4">Filter By:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Select onValueChange={(v) => dispatch(setCategory(v))}>
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Expenses">Expenses</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => dispatch(setMarkAsDone(v))}>
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Undone">Undone</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Home;
