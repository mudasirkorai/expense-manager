let income = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const balanceEl = document.getElementById("balance");
const incomeInput = document.getElementById("income-input");
const setIncomeBtn = document.getElementById("set-income");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const addExpenseBtn = document.getElementById("add-expense");
const expensesList = document.getElementById("expenses");

if (setIncomeBtn) {
  setIncomeBtn.addEventListener("click", () => {
    const newIncome = parseFloat(incomeInput.value);
    if (isNaN(newIncome) || newIncome <= 0) {
      alert("Please enter a valid income amount!");
      return;
    }
    income = newIncome;
    updateBalance();
    incomeInput.value = "";
  });
}

if (addExpenseBtn) {
  addExpenseBtn.addEventListener("click", () => {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter valid expense details!");
      return;
    }

    const expense = { name, amount, category };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateBalance();

    expenseName.value = "";
    expenseAmount.value = "";
  });
}

function displayExpenses() {
  if (!expensesList) return;
  expensesList.innerHTML = "";
  expenses.forEach((exp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.name} (${exp.category}) - ${exp.amount} PKR
      <button onclick="deleteExpense(${index})">Delete</button>`;
    expensesList.appendChild(li);
  });
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateBalance();
  }
}

function updateBalance() {
  if (!balanceEl) return;
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = income - totalExpense;
  balanceEl.textContent = balance >= 0 ? balance : 0;
}

displayExpenses();
updateBalance();
