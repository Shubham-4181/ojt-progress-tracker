const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit",function(e){

  e.preventDefault();

  const title =
    document.getElementById("title").value;

  const category =
    document.getElementById("category").value;

  const date =
    document.getElementById("date").value;

  const status =
    document.getElementById("status").value;

  const task = {
    title,
    category,
    date,
    status
  };

  tasks.push(task);

  showTasks();

  taskForm.reset();

});

function showTasks(){

  taskList.innerHTML = "";

  tasks.forEach((task)=>{

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

        <span class="${task.status.replace(' ','')}">
          ${task.status}
        </span>
      </p>

    `;

    taskList.appendChild(div);

  });

}