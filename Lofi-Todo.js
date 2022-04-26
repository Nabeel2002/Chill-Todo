//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
   //prevent page from refreshing
   event.preventDefault();
   //Create a Div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add("todo");
   //Create a list
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   //save current items to local storage
   saveLocalTodos(todoInput.value);
   //action Check Button
   const completedButoon = document.createElement('button');
   completedButoon.innerHTML = '<i class="fas fa-check"></i>'
   completedButoon.classList.add("complete-btn");
   todoDiv.appendChild(completedButoon);
   //action trash Button
   const trashdButton = document.createElement('button');
   trashdButton.innerHTML = '<i class="fas fa-trash"></i>'
   trashdButton.classList.add("trash-btn");
   todoDiv.appendChild(trashdButton);
   //append to list
   todoList.appendChild(todoDiv);
   //clear input box
   todoInput.value = " ";
}

function deleteCheck(e){
    const item = e.target;
    //delet todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.remove();
        removeLocalTodos(todo);
    }

    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                    
        }
    });
}

function saveLocalTodos(todo) {
    //check storgae
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    //check storage
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Create a Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create a list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //action Check Button
        const completedButoon = document.createElement('button');
        completedButoon.innerHTML = '<i class="fas fa-check"></i>'
        completedButoon.classList.add("complete-btn");
        todoDiv.appendChild(completedButoon);
        //action trash Button
        const trashdButton = document.createElement('button');
        trashdButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashdButton.classList.add("trash-btn");
        todoDiv.appendChild(trashdButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    //check storage
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
