const todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const submitButton = document.getElementById("submit");
const searchInput = document.getElementById("search");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(filter = "") {
  todoList.innerHTML = "";

  todos
    .filter(todo => todo.toLowerCase().includes(filter.toLowerCase()))
    .forEach((todo, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = todo;

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";  // ✅ Emoji removed, text added
      editBtn.onclick = () => editTodo(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";  // ✅ Emoji removed, text added
      deleteBtn.onclick = () => {
        todos.splice(index, 1);  
        saveTodos();
        renderTodos(searchInput.value);
      };

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);
      todoList.appendChild(li);
    });

  saveTodos();
}

function addTodo() {
  const newTodo = newTodoInput.value.trim();
  if (newTodo !== "" && !todos.includes(newTodo)) {
    todos.push(newTodo);
    newTodoInput.value = "";
    saveTodos();
    renderTodos(searchInput.value);
  }
}

function editTodo(index) {
  const updatedTodo = prompt("Edit your todo:", todos[index]);
  if (updatedTodo !== null && updatedTodo.trim() !== "") {
    todos[index] = updatedTodo.trim();
    saveTodos();
    renderTodos(searchInput.value);
  }
}

submitButton.addEventListener("click", addTodo);
searchInput.addEventListener("input", () => renderTodos(searchInput.value));

renderTodos();
