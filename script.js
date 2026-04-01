// Sample Transactions Data
let data = [
  {date:"2026-03-01", amount:5000, category:"Salary", type:"income"},
  {date:"2026-03-02", amount:1200, category:"Food", type:"expense"},
  {date:"2026-03-03", amount:800, category:"Transport", type:"expense"},
  {date:"2026-03-04", amount:200, category:"Entertainment", type:"expense"},
  {date:"2026-03-05", amount:1500, category:"Freelance", type:"income"}
];

const tableBody = document.getElementById("tableBody");
const balanceCard = document.getElementById("balanceCard");
const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");
const insightText = document.getElementById("highestCategory");
const searchInput = document.getElementById("search");
const roleSelect = document.getElementById("role");

// Function to render table
function renderTable(filter="") {
  tableBody.innerHTML = "";
  let filtered = data.filter(d => d.category.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(d => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.date}</td>
      <td>₹${d.amount}</td>
      <td>${d.category}</td>
      <td class="${d.type}">${d.type}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Update Summary Cards
function updateCards() {
  let totalIncome = data.filter(d => d.type==="income").reduce((a,b)=>a+b.amount,0);
  let totalExpense = data.filter(d => d.type==="expense").reduce((a,b)=>a+b.amount,0);
  let balance = totalIncome - totalExpense;
  balanceCard.textContent = `Balance: ₹${balance}`;
  incomeCard.textContent = `Income: ₹${totalIncome}`;
  expenseCard.textContent = `Expense: ₹${totalExpense}`;
}

// Update Insights + Middle Card
function updateInsights() {
  let expenseData = data.filter(d => d.type === "expense");
  if (expenseData.length === 0) {
    insightText.textContent = "N/A";
    return;
  }
  let categorySum = {};
  expenseData.forEach(d => categorySum[d.category] = (categorySum[d.category] || 0) + d.amount);
  let highestCategory = Object.keys(categorySum).reduce((a,b)=> categorySum[a]>categorySum[b]?a:b);
  insightText.textContent = `${highestCategory}: ₹${categorySum[highestCategory]}`;
}

// Charts
let lineChartCtx = document.getElementById('lineChart').getContext('2d');
let pieChartCtx = document.getElementById('pieChart').getContext('2d');

let lineChart = new Chart(lineChartCtx, {
  type: 'line',
  data: {
    labels: data.map(d=>d.date),
    datasets: [{
      label: 'Balance Trend',
      data: data.map((d,i)=> {
        let incomeSum = data.slice(0,i+1).filter(d=>d.type==="income").reduce((a,b)=>a+b.amount,0);
        let expenseSum = data.slice(0,i+1).filter(d=>d.type==="expense").reduce((a,b)=>a+b.amount,0);
        return incomeSum - expenseSum;
      }),
      borderColor: '#3498db',
      backgroundColor: 'rgba(52,152,219,0.2)',
      fill: true
    }]
  },
  options: { responsive:true }
});

let pieChart = new Chart(pieChartCtx, {
  type: 'pie',
  data: {
    labels: data.filter(d=>d.type==="expense").map(d=>d.category),
    datasets: [{
      label: 'Spending Breakdown',
      data: data.filter(d=>d.type==="expense").map(d=>d.amount),
      backgroundColor: ['#e74c3c','#f1c40f','#2ecc71','#9b59b6','#3498db']
    }]
  },
  options: { responsive:true }
});

// Event Listeners
searchInput.addEventListener("input",(e)=> renderTable(e.target.value));
roleSelect.addEventListener("change",(e)=>{
  if(e.target.value==="viewer"){
    alert("Viewer role: cannot edit transactions");
  } else {
    alert("Admin role: can add/edit transactions (demo)");
  }
});

// Initial Render
renderTable();
updateCards();
updateInsights();