document.addEventListener('DOMContentLoaded', loadTasks);

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                addTaskToList(task.text);
            });
        }

        function addTaskToList(taskText) {
            const taskList = document.createElement('li');
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');

            editButton.textContent = 'Edit';
            deleteButton.textContent = 'Delete';

            taskList.textContent = `${taskText}`;
            taskList.appendChild(deleteButton);
            taskList.appendChild(editButton);

            document.getElementById('ul1').appendChild(taskList);

            deleteButton.addEventListener('click', function () {
                taskList.remove();
                updateLocalStorage();
            });

            editButton.addEventListener('click', function () {
                const newTask = prompt('Edit your task:', taskText);
                if (newTask) {
                    taskList.childNodes[0].nodeValue = newTask;
                    updateLocalStorage();
                }
            });

            updateLocalStorage();
        }

        function addTasks() {
            const taskText = document.getElementById('todos').value;
            if (taskText) {
                addTaskToList(taskText);
                document.getElementById('todos').value = '';
                updateLocalStorage();
            } else {
                alert('Enter a task to add');
            }
        }

        function removeAllTasks() {
            document.getElementById('ul1').innerHTML = '';
            localStorage.removeItem('tasks');
        }

        function updateLocalStorage() {
            const tasks = [];
            document.querySelectorAll('#ul1 li').forEach(task => {
                tasks.push({ text: task.childNodes[0].nodeValue });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }