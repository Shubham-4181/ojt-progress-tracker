const notes = document.getElementById("notes");

const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

notes.value =
  localStorage.getItem("notes") || "";

showTasks();

taskForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const title =
    document.getElementById("title").value;

  const category =
    document.getElementById("category").value;

  const date =
    document.getElementById("date").value;

  const status =
    document.getElementById("status").value;

  if (
    title.trim() === "" ||
    category.trim() === "" ||
    date === ""
  ) {

    alert("Please fill all fields");

    return;

  }

  const task = {
    title,
    category,
    date,
    status
  };

  tasks.push(task);

  saveTasks();

  showTasks();

  taskForm.reset();

});

function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

function showTasks() {

  taskList.innerHTML = "";

  let completed = 0;

  if (tasks.length === 0) {

    taskList.innerHTML = `

      <div class="empty">

        No tasks added yet

      </div>

    `;

    showSummary(0);

    return;

  }

  tasks.forEach((task, index) => {

    if (task.status === "Completed") {

      completed++;

    }

    const div = document.createElement("div");

    div.classList.add("task");

    div.innerHTML = `

      <h3>${task.title}</h3>

      <p>
        <strong>Category:</strong>
        ${task.category}
      </p>

      <p>
        <strong>Date:</strong>
        ${task.date}
      </p>

      <p>
        <strong>Status:</strong>

        <span class="${task.status.replace(' ', '')}">
          ${task.status}
        </span>
      </p>

      <div class="buttons">

        <button onclick="completeTask(${index})">
          Complete
        </button>

        <button
          onclick="editTask(${index})"
          class="edit"
        >
          Edit
        </button>

        <button
          onclick="deleteTask(${index})"
          class="delete"
        >
          Delete
        </button>

      </div>

    `;

    taskList.appendChild(div);

  });

  showSummary(completed);

}

function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  showTasks();

}

function completeTask(index) {

  tasks[index].status = "Completed";

  saveTasks();

  showTasks();

}

function editTask(index) {

  const newTitle =
    prompt(
      "Edit Task Title",
      tasks[index].title
    );

  const newCategory =
    prompt(
      "Edit Category",
      tasks[index].category
    );

  if (newTitle && newCategory) {

    tasks[index].title = newTitle;

    tasks[index].category = newCategory;

    saveTasks();

    showTasks();

  }

}

function showSummary(completed) {

  const total = tasks.length;

  const pending = total - completed;

  let summary =
    document.getElementById("summary");

  summary.innerHTML = `

    <div class="summary-box">

      <h2>Task Summary</h2>

      <p>Total Tasks: ${total}</p>

      <p>Completed Tasks: ${completed}</p>

      <p>Pending Tasks: ${pending}</p>

    </div>

  `;

}

notes.addEventListener("keyup", function () {

  localStorage.setItem(
    "notes",
    notes.value
  );

});