// invoice-form.js
// Simple sample logic for invoice form (no backend)

const form = document.getElementById("invoice-form");
const resultBox = document.getElementById("result-box");
const studentsContainer = document.getElementById("students-container");

// Dynamically show student fields based on "How Many Students"
document.getElementById("students_count").addEventListener("input", (e) => {
  const count = Number(e.target.value);
  studentsContainer.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.className = "form-row";
    div.innerHTML = `
      <label>Student ${i}</label>
      <input type="text" id="student_${i}" placeholder="Student name..." />
    `;
    studentsContainer.appendChild(div);
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    subject: subject.value,
    client: client.value,
    status: status.value,
    currency: currency.value,
    total_amount: total_amount.value,
    discount: discount.value,
    month_no: month_no.value,
    invoice_date: invoice_date.value,
    last_reminder_date: last_reminder_date.value || null,
    students_count: students_count.value,
    students: [],
  };

  for (let i = 1; i <= students_count.value; i++) {
    data.students.push(document.getElementById(`student_${i}`).value);
  }

  resultBox.style.display = "block";
  resultBox.textContent = JSON.stringify(data, null, 2);
});
