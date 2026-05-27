const notes = document.getElementById("notes");

const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

let tasks = [];

notes.value =
  localStorage.getItem("notes") || "";

loadTasks();

taskForm.addEventListener(
  "submit",
  async function (e) {

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

    await fetch(
      "http://localhost:8080/add-task",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(task)

      }
    );

    loadTasks();

    taskForm.reset();

  }
);

async function loadTasks() {

  const res =
    await fetch(
      "http://localhost:8080/tasks"
    );

  tasks = await res.json();

  showTasks();

}

function showTasks() {

  taskList.innerHTML = "";

  let completed = 0;

  if (tasks.length === 0) {

    taskList.innerHTML = `

      <div class="empty">

        🚀 Start your OJT journey
        by adding your first task

      </div>

    `;

    showSummary(0);

    showStreak();

    return;

  }

  tasks.forEach((task) => {

    if (task.status === "Completed") {

      completed++;

    }

    const div =
      document.createElement("div");

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

        <span
          class="${task.status.replace(' ', '')}"
        >
          ${task.status}
        </span>
      </p>

      <div class="buttons">

        <button
          onclick="completeTask('${task._id}')"
        >
          Complete
        </button>

        <button
          onclick="editTask('${task._id}')"
          class="edit"
        >
          Edit
        </button>

        <button
          onclick="deleteTask('${task._id}')"
          class="delete"
        >
          Delete
        </button>

      </div>

    `;

    taskList.appendChild(div);

  });

  showSummary(completed);

  showStreak();

}

async function deleteTask(id) {

  await fetch(

    `http://localhost:8080/delete-task/${id}`,

    {
      method: "DELETE"
    }

  );

  loadTasks();

}

async function completeTask(id) {

  await fetch(

    `http://localhost:8080/complete-task/${id}`,

    {
      method: "PUT"
    }

  );

  loadTasks();

}

async function editTask(id) {

  const task =
    tasks.find(task => task._id === id);

  const newTitle =
    prompt(
      "Edit Task Title",
      task.title
    );

  const newCategory =
    prompt(
      "Edit Category",
      task.category
    );

  if (newTitle && newCategory) {

    await fetch(

      `http://localhost:8080/edit-task/${id}`,

      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          title: newTitle,

          category: newCategory

        })

      }

    );

    loadTasks();

  }

}

function showSummary(completed) {

  const total = tasks.length;

  const pending =
    total - completed;

  let percentage = 0;

  if(total > 0){

    percentage =
      Math.round(
        (completed / total) * 100
      );

  }

  let message = "";

  if(percentage === 100){

    message =
      "Excellent! All tasks completed 🚀";

  }

  else if(percentage >= 50){

    message =
      "Great progress! Keep going 🔥";

  }

  else{

    message =
      "Keep learning and stay consistent 💪";

  }

  let summary =
    document.getElementById("summary");

  summary.innerHTML = `

    <div class="summary-box">

      <h2>Task Summary</h2>

      <p>Total Tasks: ${total}</p>

      <p>Completed Tasks: ${completed}</p>

      <p>Pending Tasks: ${pending}</p>

      <p>
        Completion Rate:
        ${percentage}%
      </p>

      <div class="progress">

        <div
          class="progress-bar"
          style="width:${percentage}%"
        >
        </div>

      </div>

      <h3 class="message">
        ${message}
      </h3>

    </div>

  `;

}

function showStreak() {

  let streak = 0;

  const completedTasks =
    tasks.filter(task =>
      task.status === "Completed"
    );

  const dates =
    completedTasks.map(task => {

      if(task.completedAt){

        return new Date(
          task.completedAt
        ).toDateString();

      }

    });

  const uniqueDates =
    [...new Set(dates)];

  streak = uniqueDates.length;

  const streakDiv =
    document.getElementById("streak");

  streakDiv.innerHTML = `

    <div class="summary-box">

      <h2>
        🔥 Current Streak
      </h2>

      <p>
        ${streak} Days
      </p>

    </div>

  `;

}

notes.addEventListener(
  "keyup",
  function () {

    localStorage.setItem(
      "notes",
      notes.value
    );

  }
);