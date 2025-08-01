// import { createSlice } from "@reduxjs/toolkit";

// const expenseSlice = createSlice({
//   name: "expense",
//   initialState: {
//     category: "",
//   },
//   reducers: {
//     setCategory: (state, action) => {
//       state.category = action.payload;
//     },
//   }
// });

// export const {
//   setCategory
// } = expenseSlice.actions;

// export default expenseSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    loading: false,
    filterCategory: "all",
    showDone: false,
    showUndone: false,
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    toggleExpenseStatus: (state, action) => {
      const expenseId = action.payload;
      const index = state.expenses.findIndex(exp => exp._id === expenseId);
      if (index !== -1) {
        state.expenses[index].done = !state.expenses[index].done;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    toggleShowDone: (state) => {
      state.showDone = !state.showDone;
    },
    toggleShowUndone: (state) => {
      state.showUndone = !state.showUndone;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  toggleExpenseStatus,
  setLoading,
  setFilterCategory,
  toggleShowDone,
  toggleShowUndone,
} = expenseSlice.actions;

export default expenseSlice.reducer;
