document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToList(task.text);
  });
}

function addTaskToList(taskText) {
  const allTasksList = document.getElementById("ul1");
  const taskList = document.createElement("li");
  const deleteButton = document.createElement("i");
  const editButton = document.createElement("i");

  deleteButton.className = "fas fa-trash-alt";
  editButton.className = "fas fa-edit";

  const span = document.createElement("span");
  span.appendChild(deleteButton);
  span.appendChild(editButton);

  taskList.textContent = `${taskText}`;
  taskList.appendChild(span);

  document.getElementById("ul1").appendChild(taskList);

  deleteButton.addEventListener("click", function () {
    taskList.remove();
    updateLocalStorage();
  });

  editButton.addEventListener("click", function () {
    const newTask = prompt("Edit your task:", taskText);
    if (newTask) {
      taskList.childNodes[0].nodeValue = newTask;
      updateLocalStorage();
    }
  });

  updateLocalStorage();
}

function addTasks() {
  const taskText = document.getElementById("todos").value;
  if (taskText) {
    addTaskToList(taskText);
    document.getElementById("todos").value = "";
    updateLocalStorage();
  } else {
    alert("Enter a task to add");
  }
}

function removeAllTasks() {
  document.getElementById("ul1").innerHTML = "";
  localStorage.removeItem("tasks");
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#ul1 li").forEach((task) => {
    tasks.push({ text: task.childNodes[0].nodeValue });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}