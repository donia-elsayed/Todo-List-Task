var requestData = [];
var idArray = [];

function creatRequest() {
    var url = new URL("https://jsonplaceholder.typicode.com/todos");
    var todoRequest = new XMLHttpRequest();
    todoRequest.open("GET", url);
    todoRequest.send();
    todoRequest.onload = function () {
        if (todoRequest.status == 200) {
            requestData = JSON.parse(todoRequest.responseText);
            createElements();
            getUserId(requestData);
        }   
    }
}
creatRequest();

var listData = document.getElementById("todo-data");
function createElements() {
    for (var i = 0; i < requestData.length; i++) {
           getRequestData(requestData[i]);
    }
}

function getRequestData(arr) {
    var item = document.createElement("li");
    listData.appendChild(item);
    item.innerHTML = "userId: " + arr.userId + "<br>" + "id: " + arr.id + "<br>" +
                     "title: " + arr.title + "<br>" + "completed: " + arr.completed;
    getColor(arr, item);
}

function getColor(arr, listLi) {
    listLi.style.marginBottom = "20px";
    if (arr.completed === true) {
        listLi.className = "completeTask";
        listLi.style.backgroundColor = "green";   
    }
    else {
        listLi.className = "progressTask";
        listLi.style.backgroundColor = "yellow";
    }  
}

var taskSelect = document.getElementById("task-status");
taskSelect.onchange = selectedTask;
function selectedTask() {
    var taskOption = taskSelect.value;
    var completeItem = document.getElementsByClassName("completeTask");
    var progressItem = document.getElementsByClassName("progressTask");
    if (taskOption == "completed") {
        completedTask(completeItem,progressItem);
    }
    else if (taskOption == "in-progress") {
        inprogressTask(completeItem, progressItem);
    } 
    else if (taskOption == "All"){
        resetData();
    }
}
function completedTask(complete,progress) {
    for (var i = 0; i < complete.length; i++) {
        complete[i].style.display = "block";
    }
    for (var i = 0; i < progress.length; i++) {
        progress[i].style.display = "none";
    }  
}
function inprogressTask(complete,progress) {
    for (var i = 0; i < progress.length; i++) {
        progress[i].style.display = "block";
    }  
    for (var i = 0; i < complete.length; i++) {
        complete[i].style.display = "none";
    }  
}
// User Id Select 
var list = document.getElementById("list-id");
function getUserId(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (idArray.indexOf(obj[i].userId) == -1) idArray.push(obj[i].userId);
    }
    addIdToSelect(idArray);  
}

function addIdToSelect(obj) {
    for (var i = 0; i < obj.length; i++) {
        var idOption = document.createElement("option");
        idOption.text = obj[i];
        idOption.value = obj[i];
        list.add(idOption);
    }
}
list.onchange = showTaskById;

function showTaskById() {
    listData.innerHTML = '';
    for (var i = 0; i < requestData.length; i++) {
        if (list.value == requestData[i].userId) getRequestData(requestData[i]);
    }
}
// Reseat Function 
var butReset = document.getElementById("reset");
butReset.onclick = resetData;
function resetData() {
    var listData = document.getElementById("todo-data");
    listData.innerHTML = "";
    createElements();
}