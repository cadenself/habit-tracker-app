const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const resetBtn = document.getElementById("reset-btn");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const habitDiv = document.createElement("div");
    habitDiv.className = "habit";

    const title = document.createElement("div");
    title.className = "habit-title";
    title.textContent = habit.name;

    const checkboxes = document.createElement("div");
    checkboxes.className = "day-checks";

    for (let i = 0; i < 7; i++) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = habit.days[i];
      checkbox.addEventListener("change", () => {
        habit.days[i] = checkbox.checked;
        saveHabits();
      });
      checkboxes.appendChild(checkbox);
    }

    habitDiv.appendChild(title);
    habitDiv.appendChild(checkboxes);
    habitList.appendChild(habitDiv);
  });
}

function addHabit(name) {
  habits.push({ name, days: Array(7).fill(false) });
  saveHabits();
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

habitForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = habitInput.value.trim();
  if (name) {
    addHabit(name);
    habitInput.value = "";
  }
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset all progress?")) {
    habits = [];
    saveHabits();
  }
});

renderHabits();
