let todoItemsContainer=document.getElementById("todoItemsContainer");
let todoUserInput=document.getElementById("todoUserInput");
let addTodoBtn=document.querySelector(".add-todo-button");
let saveTodoBtn=document.querySelector(".save-todo-button");
function getTodoListFromLocalStorage() {
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null) {
        return [
            {text:"Learn HTML",uni:1,isChecked:false},
            {text:"Learn CSS",uni:2,isChecked:false},
            {text:"Learn JavaScript",uni:3,isChecked:false}
        ];
    } else {
        return parsedTodoList;
    }
}
let todoList=getTodoListFromLocalStorage();
let count=todoList.length;
function createAndAppendTodo(todo) {
    let todoId="todo"+todo.uni;
    let todoElement=document.createElement("li");
    todoElement.id=todoId;
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoItemsContainer.appendChild(todoElement);
    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id="checkbox"+todo.uni;
    inputElement.classList.add("checkbox-input");
    inputElement.checked=todo.isChecked;
    todoElement.appendChild(inputElement);
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container");
    todoElement.appendChild(labelContainer);
    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",inputElement.id);
    labelElement.id="label"+todo.uni;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;

    if(todo.isChecked) {
        labelElement.classList.add("check");
    }

    labelContainer.appendChild(labelElement);

    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("fas","fa-trash","delete-icon");

    deleteIconContainer.appendChild(deleteIcon);
    labelContainer.appendChild(deleteIconContainer);

    deleteIcon.onclick=function () {
        todoItemsContainer.removeChild(todoElement);

        todoList=todoList.filter(function (eachTodo) {
            return eachTodo.uni!==todo.uni;
        });

        localStorage.setItem("todoList",JSON.stringify(todoList));
    };

    inputElement.onclick=function () {
        todo.isChecked=inputElement.checked;
        labelElement.classList.toggle("check");
        localStorage.setItem("todoList",JSON.stringify(todoList));
    };
}

function addTodo() {
    let inputVal=todoUserInput.value.trim();

    if(inputVal==="") {
        alert("Please enter a todo item.");
        return;
    }

    for(let todo of todoList) {
        if(todo.text.toLowerCase()===inputVal.toLowerCase()) {
            alert("This todo item already exists.");
            return;
        }
    }

    count+=1;

    let newTodo={
        text:inputVal,
        uni:count,
        isChecked:false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value="";

    localStorage.setItem("todoList",JSON.stringify(todoList));
}

addTodoBtn.onclick=addTodo;

todoUserInput.addEventListener("keydown",function (event) {
    if(event.key==="Enter") {
        addTodo();
    }
});

saveTodoBtn.onclick=function () {
    localStorage.setItem("todoList",JSON.stringify(todoList));
    alert("Todo List Saved");
};

for(let todo of todoList) {
    createAndAppendTodo(todo);
}
