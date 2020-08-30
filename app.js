import TaskManager from "./taskmanager.js";

const taskModalSaveBtn = document.querySelector("#task-modal-save");
const alert = document.querySelector(".alert");
const alertModal = document.querySelector(".alertModal");
const taskContainer = document.querySelector("#tasks");
const clearAllBtn = document.querySelector("#deleteAll");
//form.name.
const taskForm = document.querySelector("#taskForm");
//TaskDetails
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.forms.taskForm.taskDescription;
const taskAssignedTo = document.forms.taskForm.taskAssignedTo;
const taskDueDate = document.forms.taskForm.taskDueDate;
const taskDetails = [taskTitle, taskDescription, taskAssignedTo, taskDueDate];
//Priority && Status
// priorities creating an array of options:
const high = document.querySelector("#highPriority");
const medium = document.querySelector("#mediumPriority");
const low = document.querySelector("#lowPriority");
const nopriority = document.querySelector("#noPriority");
let priorities = [high, medium, low, nopriority];

//progress :
const done = document.querySelector("#statusDone");
const review = document.querySelector("#statusReview");
const inprogress = document.querySelector("#statusInProgress");
const todo = document.querySelector("#statusToDo");
let progress = [done, review, inprogress, todo];

const selectPriority = [
  ...document.forms.taskForm.querySelectorAll("input[name=priority]"),
];
const selectStatus = [
  ...document.forms.taskForm.querySelectorAll("input[name=status]"),
];

const newToDo = document.querySelector("#newToDo");
const openNewTask = document.querySelector("#openForm");

//The buttons on the form

const formCancel = taskForm.querySelector("#cancelButton");
const formClose = taskForm.querySelector("#close"); //modify later
formCancel.addEventListener("click", removeTaskFormId);
formClose.addEventListener("click", removeTaskFormId);

function removeTaskFormId() {
  taskForm.removeAttribute("data-id");
}

//init class: ***************************************************************************************************
const taskmanager = new TaskManager(
  newToDo,
  openNewTask,
  taskModalSaveBtn,
  alert,
  alertModal,
  taskContainer,
  taskForm,
  taskTitle,
  taskDescription,
  taskAssignedTo,
  taskDueDate,
  priorities,
  progress,
  selectPriority,
  selectStatus
);
//=================================================================================================================
// **********************Events***********************************************************************************
//=================================================================================================================

window.addEventListener("DOMContentLoaded", taskmanager.display());
//Open modal:
openNewTask.addEventListener("click", function (event) {
  event.preventDefault();
  taskmanager.openModal();
});
// save button :
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  taskmanager.formFilledOut(event);
});
// checkTitle(){
taskTitle.addEventListener("input", function (event) {
  taskmanager.validation(
    event.target,
    taskmanager.notEmptyandLongerThan(event.target.value, 8)
  );
});
// }
// checkDescription(){
taskDescription.addEventListener("input", function (event) {
  taskmanager.validation(
    event.target,
    taskmanager.notEmptyandLongerThan(event.target.value, 15)
  );
});
// }
// checkAssignee(){
taskAssignedTo.addEventListener("input", function (event) {
  taskmanager.validation(
    event.target,
    taskmanager.notEmptyandLongerThan(event.target.value, 8)
  );
});
// }
// checkDueDate(){
taskDueDate.addEventListener("input", function (event) {
  const today = taskmanager.todayConvertor();
  const dueDate = new Date(event.target.value);
  taskmanager.validation(event.target, today <= dueDate);
});
// }

// Clear all:
clearAllBtn.addEventListener("click", function () {
  taskmanager.deleteAll();
  taskmanager.alertSetup(
    "Successfully removed items from the list",
    "alert-success"
  );
});

//navigation bar
const getTotal = document.querySelector("#getTotal");
const totalNumber = document.querySelector("#getTotal > span");
getTotal.addEventListener("click", () => taskmanager.display());

const getDone = document.querySelector("#getDone");
const getReview = document.querySelector("#getReview");
const getInProgress = document.querySelector("#getInProgress");
const getToDo = document.querySelector("#getToDo");

getDone.addEventListener("click", function () {
  const done = taskmanager.getStatsOfStatus()[0];
  taskmanager.displayByItem(done);
});
getReview.addEventListener("click", function () {
  const review = taskmanager.getStatsOfStatus()[1];
  taskmanager.displayByItem(review);
});
getInProgress.addEventListener("click", function () {
  const inProgress = taskmanager.getStatsOfStatus()[2];
  taskmanager.displayByItem(inProgress);
});
getToDo.addEventListener("click", function () {
  const toDo = taskmanager.getStatsOfStatus()[3];
  taskmanager.displayByItem(toDo);
});
const getHigh = document.querySelector("#getHigh");
const getMedium = document.querySelector("#getMedium");
const getLow = document.querySelector("#getLow");
const getNo = document.querySelector("#getNo");

getHigh.addEventListener("click", function () {
  const high = taskmanager.getStatsOfPriority()[0];
  taskmanager.displayByItem(high);
});
getMedium.addEventListener("click", function () {
  const medium = taskmanager.getStatsOfPriority()[1];
  taskmanager.displayByItem(medium);
});
getLow.addEventListener("click", function () {
  const low = taskmanager.getStatsOfPriority()[2];
  taskmanager.displayByItem(low);
});
getNo.addEventListener("click", function () {
  const no = taskmanager.getStatsOfPriority()[3];
  taskmanager.displayByItem(no);
});

////Status: done =text-success, Review =text-info, InProgress=text-warning, toDo = text-danger;
////Priority: high = bg-danger, medium = bg-warning, low = bg-info, no = bg-dark;
// function stats() {
//     getTotal.querySelector("span").innerHTML = `${taskmanager.tasks.length}`;
//     getDone.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-success").length}`;
//     getReview.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-info").length}`;
//     getInProgress.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-warning").length}`;
//     getToDo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-danger").length}`;
//     getNo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-dark").length}`;
//     getLow.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-info").length}`;
//     getMedium.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-warning").length}`;
//     getHigh.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-danger").length}`;
// }
