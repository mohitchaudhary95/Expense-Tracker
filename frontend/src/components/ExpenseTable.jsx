import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense);
  const [localExpense, setLocalExpense] = useState([]);

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const handleCheckboxChange = async (expenseId) => {
    const expenseToUpdate = localExpense.find((exp) => exp._id === expenseId);
    const newStatus = !expenseToUpdate.done;

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setLocalExpense((prev) =>
          prev.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (expenseId) => {
    console.log("Edit clicked for:", expenseId);
  };

  const handleDelete = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/expense/remove/${expenseId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const filterExpenses = localExpense.filter(
          (expense) => expense._id !== expenseId
        );
        setLocalExpense(filterExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

const totalAmount = localExpense?.reduce(
  (acc, expense) => acc + (!expense.done ? Number(expense.amount || 0) : 0),
  0
);


  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <Table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
        <TableCaption className="text-base font-semibold py-4">
          A list of your recent expenses.
        </TableCaption>

        <TableHeader className="bg-gray-100">
          <TableRow className="hover:bg-primary/5 dark:hover:bg-primary/10 transition">
            <TableHead className="w-[150px] uppercase font-bold text-gray-600">
              Mark As Done
            </TableHead>
            <TableHead className="uppercase font-bold text-gray-600">
              Description
            </TableHead>
            <TableHead className="uppercase font-bold text-gray-600">
              Category
            </TableHead>
            <TableHead className="uppercase font-bold text-gray-600">
              Amount
            </TableHead>
            <TableHead className="uppercase font-bold text-gray-600">
              Date
            </TableHead>
            <TableHead className="text-right uppercase font-bold text-gray-600">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {localExpense && localExpense.length > 0 ? (
            localExpense.map((expense) => (
              <TableRow
                key={expense._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <TableCell className="py-3">
                  <Checkbox
                    checked={expense.done}
                    onCheckedChange={() => handleCheckboxChange(expense._id)}
                    className="h-5 w-5 border-gray-400"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {expense.description}
                </TableCell>
                <TableCell className="font-medium">
                  {expense.category}
                </TableCell>
                <TableCell className="font-medium">
                  ${Number(expense.amount).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">
                  {expense.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEdit(expense._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} className="inline-block" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} className="inline-block" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 font-semibold">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter className="bg-gray-50 dark:bg-gray-800 font-bold">
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              $
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ExpenseTable;
