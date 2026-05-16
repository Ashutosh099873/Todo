let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let searchInput = document.getElementById("searchInput");
let themeBtn = document.getElementById("themeBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateStats() {

    totalTasks.textContent = todos.length;

    let completed = todos.filter(todo => todo.completed).length;

    completedTasks.textContent = completed;
}

function renderTodos(filter = "") {

    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo =>
        todo.text.toLowerCase().includes(filter.toLowerCase())
    );

    filteredTodos.forEach((todo, index) => {

        let li = document.createElement("li");
        li.classList.add("todo-item");

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("todo-left");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos(searchInput.value);
        });

        let span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        let iconGroup = document.createElement("div");
        iconGroup.classList.add("icon-group");

        // EDIT ICON
        let editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit");

        editIcon.addEventListener("click", () => {

            let updatedText = prompt("Edit Todo", todo.text);

            if (updatedText !== null && updatedText.trim() !== "") {

                todo.text = updatedText.trim();

                saveTodos();

                renderTodos(searchInput.value);
            }
        });

        // DELETE ICON
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt");

        deleteIcon.addEventListener("click", () => {

            todos.splice(index, 1);

            saveTodos();

            renderTodos(searchInput.value);
        });

        iconGroup.appendChild(editIcon);
        iconGroup.appendChild(deleteIcon);

        li.appendChild(leftDiv);
        li.appendChild(iconGroup);

        todoList.appendChild(li);
    });

    updateStats();
}

function addTodo() {

    let text = todoInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    saveTodos();

    renderTodos(searchInput.value);

    todoInput.value = "";
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTodo();
    }
});

searchInput.addEventListener("input", () => {
    renderTodos(searchInput.value);
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
});

renderTodos();
