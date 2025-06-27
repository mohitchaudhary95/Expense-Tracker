import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";

const Home = () => {
  return (
    <div className="px-4">
      <Navbar />
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Expense</h1>
        <CreateExpense />
      </div>
    </div>
  );
};

export default Home;

