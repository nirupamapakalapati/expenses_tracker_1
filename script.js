// Load transactions from localStorage
let username = localStorage.getItem("username");

let transactions = JSON.parse(
  localStorage.getItem("transactions_" + username)
) || [];

/* -------------------- SHOW / HIDE CATEGORY -------------------- */
function toggleCategory() {
  let type = document.getElementById("type").value;
  let categoryDiv = document.getElementById("categoryDiv");

  if (type === "Expense") {
    categoryDiv.style.display = "block";
  } else {
    categoryDiv.style.display = "none";
  }
}

/* -------------------- ADD TRANSACTION -------------------- */
function addTransaction() {
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;
  let date = document.getElementById("date").value;

  let category = "-";

  if (type === "Expense") {
    let categoryElement = document.getElementById("category");
    if (categoryElement) {
      category = categoryElement.value;
    }
  }

  if (amount === "" || date === "") {
    alert("Please fill all fields");
    return;
  }

  let transaction = {
    id: Date.now(),
    amount: parseFloat(amount),
    type: type,
    category: category,
    date: date
  };

  transactions.push(transaction);
  updateUI();

  // Clear inputs
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}

/* -------------------- DELETE TRANSACTION -------------------- */
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

/* -------------------- UPDATE UI -------------------- */
function updateUI() {
  let table = document.getElementById("transactionTable");
  table.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(t => {

    let row = `
      <tr>
        <td>₹ ${t.amount}</td>
        <td>${t.type}</td>
        <td>${t.category}</td>
        <td>${t.date}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${t.id})">
            Delete
          </button>
        </td>
      </tr>
    `;

    table.innerHTML += row;

    if (t.type === "Income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
  });

  document.getElementById("totalIncome").innerText = totalIncome;
  document.getElementById("totalExpense").innerText = totalExpense;
  document.getElementById("balance").innerText = totalIncome - totalExpense;

  // Save to localStorage
  localStorage.setItem("transactions_" + username, JSON.stringify(transactions));
}

/* -------------------- PAGE LOAD -------------------- */
window.onload = function () {

  username = localStorage.getItem("username");

  if (!username) {
    window.location.href = "welcome.html";
  } else {
    document.getElementById("displayName").innerText = username;

    transactions = JSON.parse(
      localStorage.getItem("transactions_" + username)
    ) || [];

    updateUI();
  }

};