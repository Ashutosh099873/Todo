let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoUserInput = document.getElementById("todoUserInput");
let addTodoBtn = document.querySelector(".add-todo-button");
let saveTodoBtn = document.querySelector(".save-todo-button");

// DEFAULT TODOS
let todoList = [
    { text: "Learn HTML", uni: 1, isChecked: false },
    { text: "Learn CSS", uni: 2, isChecked: false },
    { text: "Learn JavaScript", uni: 3, isChecked: false }
];

let count = todoList.length;

// CREATE TODO ITEM
function createAndAppendTodo(todo) {

    let todoId = "todo" + todo.uni;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    // CHECKBOX
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = "checkbox" + todo.uni;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    todoElement.appendChild(inputElement);

    // LABEL CONTAINER
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    // LABEL
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputElement.id);
    labelElement.id = "label" + todo.uni;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked) {
        labelElement.classList.add("check");
    }

    labelContainer.appendChild(labelElement);

    // DELETE ICON
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

   let deleteIcon = document.createElement("i");
deleteIcon.classList.add("fas", "fa-trash", "delete-icon");

    // CHECKBOX FUNCTION
    inputElement.onclick = function () {
        todo.isChecked = inputElement.checked;
        labelElement.classList.toggle("check");
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };
}

// ADD TODO FUNCTION
function addTodo() {
    let inputVal = todoUserInput.value.trim();

    if (inputVal === "") {
        alert("Please enter a todo item.");
        return;
    }

    for (let todo of todoList) {
        if (todo.text === inputVal) {
            alert("This todo item already exists.");
            return;
        }
    }

    count += 1;

    let newTodo = {
        text: inputVal,
        uni: count,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";
}

// BUTTON CLICK
addTodoBtn.onclick = addTodo;

// ENTER KEY SUPPORT
todoUserInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// SAVE BUTTON
saveTodoBtn.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

// LOAD FROM LOCAL STORAGE
window.onload = function () {
    let storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
        todoList = JSON.parse(storedTodoList);
        todoItemsContainer.innerHTML = "";
        count = todoList.length;
    }

    for (let todo of todoList) {
        createAndAppendTodo(todo);
    }
};
