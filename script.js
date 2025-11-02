let currentUser = null;
let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

const userSection = document.getElementById("user-section");
const mainApp = document.getElementById("main-app");
const userNameInput = document.getElementById("user-name-input");
const startBtn = document.getElementById("start-btn");
const welcomeText = document.getElementById("welcome-text");

const balanceEl = document.getElementById("balance");
const incomeInput = document.getElementById("income-input");
const setIncomeBtn = document.getElementById("set-income");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const addExpenseBtn = document.getElementById("add-expense");
const expensesList = document.getElementById("expenses");

const switchUserBtn = document.getElementById("switch-user");
const deleteUserBtn = document.getElementById("delete-user");

// Start button event
startBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  currentUser = name;

  if (!usersData[currentUser]) {
    usersData[currentUser] = { income: 0, expenses: [] };
  }

  userSection.style.display = "none";
  mainApp.style.display = "block";
  welcomeText.textContent = `Welcome, ${currentUser}!`;

  updateUI();
});

// Set income
setIncomeBtn.addEventListener("click", () => {
  const income = parseFloat(incomeInput.value);
  if (isNaN(income) || income <= 0) {
    alert("Enter a valid income amount!");
    return;
  }

  usersData[currentUser].income += income;
  saveData();
  updateUI();
  incomeInput.value = "";
});

// Add expense
addExpenseBtn.addEventListener("click", () => {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please fill all expense fields!");
    return;
  }

  usersData[currentUser].expenses.push({ name, amount, category });
  saveData();
  updateUI();

  expenseName.value = "";
  expenseAmount.value = "";
});

function displayExpenses() {
  expensesList.innerHTML = "";

  usersData[currentUser].expenses.forEach((exp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.name} (${exp.category}) - ${exp.amount} PKR
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    expensesList.appendChild(li);
  });
}

function deleteExpense(index) {
  usersData[currentUser].expenses.splice(index, 1);
  saveData();
  updateUI();
}

function updateUI() {
  const user = usersData[currentUser];
  const totalExpense = user.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = user.income - totalExpense;

  balanceEl.textContent = balance >= 0 ? balance : 0;
  displayExpenses();
}

function saveData() {
  localStorage.setItem("usersData", JSON.stringify(usersData));
}

// Switch to another user
switchUserBtn.addEventListener("click", () => {
  saveData();
  mainApp.style.display = "none";
  userSection.style.display = "block";
  userNameInput.value = "";
});

// Delete user data
deleteUserBtn.addEventListener("click", () => {
  if (confirm(`Delete all data for ${currentUser}?`)) {
    delete usersData[currentUser];
    saveData();
    mainApp.style.display = "none";
    userSection.style.display = "block";
  }
});

// Display existing data if available
if (Object.keys(usersData).length === 0) {
  console.log("No user data found yet.");
}
