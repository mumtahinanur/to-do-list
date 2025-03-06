const todoList = JSON.parse(localStorage.getItem('list')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const object = todoList[i];
    const {task, date, checked} = object;

    const html = `
      <div class="task-elements">
        <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''} onclick="toggleCheckbox(${i})">
        ${task}
      </div> 
      <div class="date-elements">${date}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
        localStorage.setItem('list', JSON.stringify(todoList));
      " class="delete-button">-</button>
    `;

    todoListHTML += html;
  }

  document.querySelector('.todo-grid').innerHTML = todoListHTML;
}

function addTask() {
  const taskInput = document.querySelector('.name-input');
  const task = taskInput.value;

  const dateInput = document.querySelector('.date-input');
  const date = dateInput.value;

  todoList.push({
    task,
    date,
    checked: false
  });

  localStorage.setItem('list', JSON.stringify(todoList));

  taskInput.value = '';
  dateInput.value = '';

  renderTodoList();
}

function toggleCheckbox(index) {
  todoList[index].checked = !todoList[index].checked;
  localStorage.setItem('list', JSON.stringify(todoList));
}