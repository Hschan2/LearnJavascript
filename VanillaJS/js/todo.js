const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input"); // const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = []; // for saving

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // String으로 저장
}

function DeleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // li.id는 String
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");

    span.innerText = newTodo.text;

    const button = document.createElement("button");
    
    button.innerText = "X";
    button.addEventListener("click", DeleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();

    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; // 이전에 저장한 값 유지
    parsedToDos.forEach(paintToDo); // localStorage에 있는 데이터만큼 반복해서 그리기
}