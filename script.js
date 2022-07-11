const inputTodo = document.querySelector(".input-field input");
const btnAdd = document.querySelector(".input-field button");
const todoList = document.querySelector(".todo-list");
const btnClearAll = document.querySelector(".footer button");
const pendingCount = document.querySelector(".pendingCount");

inputTodo.onkeyup = () => {
    let userInput = inputTodo.value;
    if (userInput.trim() != 0) {
        btnAdd.classList.add("active");
    } else {
        btnAdd.classList.remove("active");
    }
}

showTasks();

btnAdd.onclick = () => {
    let userInput = inputTodo.value;
    let getLocalStorage = localStorage.getItem("New todo"); //get local storage to store tasks
    if (getLocalStorage == null) { //if local storage has no item
        listArr = []; //initialize an empty array to store tasks
    } else {
        // dataArr is json obj => parse to json arr
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userInput); // push new task
    localStorage.setItem("New todo", JSON.stringify(listArr)); //parse js obj (dataarr) to js string (localstorage)
    btnAdd.classList.remove("active");
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New todo"); //get local storage to store tasks
    if (getLocalStorage == null) { //if local storage has no item
        listArr = []; //initialize an empty array to store tasks
    } else {
        // dataArr is json obj => parse to json arr
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    listArr.forEach((ele,index) => {
        newLiTag += `<li>${ele}<span onclick="deleteTask(${index})"><i class="fa fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputTodo.value = "";
    pendingCount.textContent = listArr.length;
    if(listArr.length > 0) {
        btnClearAll.classList.add("active");
    } else {
        btnClearAll.classList.remove("active");
    }
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New todo"); //get local storage to store tasks
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New todo", JSON.stringify(listArr)); //parse js obj (dataarr) to js string (localstorage)
    showTasks();
}

btnClearAll.onclick = () => {
    listArr = [];
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}